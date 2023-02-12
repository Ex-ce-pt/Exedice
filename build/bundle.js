
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\NavBar.svelte generated by Svelte v3.55.1 */

    const file$5 = "src\\NavBar.svelte";

    function create_fragment$5(ctx) {
    	let nav;
    	let div;
    	let button0;
    	let svg0;
    	let path0;
    	let t0;
    	let button1;
    	let svg1;
    	let path1;
    	let t1;
    	let button2;
    	let svg2;
    	let path2;
    	let t2;
    	let button3;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div = element("div");
    			button0 = element("button");
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t0 = space();
    			button1 = element("button");
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			t1 = space();
    			button2 = element("button");
    			svg2 = svg_element("svg");
    			path2 = svg_element("path");
    			t2 = space();
    			button3 = element("button");
    			attr_dev(path0, "id", "youtube-logo");
    			set_style(path0, "stroke-linecap", "round");
    			set_style(path0, "stroke-miterlimit", "0");
    			attr_dev(path0, "d", "M 15 17.5 C 6.6900083 17.5 0 24.190008 0 32.5 L 0 67.5 C 0 75.809992 6.6900083 82.5 15 82.5 L 85 82.5 C 93.309992 82.5 100 75.809992 100 67.5 L 100 32.5 C 100 24.190008 93.309992 17.5 85 17.5 L 15 17.5 z M 40 35 L 60 50 L 40 65 L 40 35 z ");
    			add_location(path0, file$5, 26, 14, 719);
    			attr_dev(svg0, "width", "100");
    			attr_dev(svg0, "height", "100");
    			attr_dev(svg0, "viewBox", "0 0 100 100");
    			attr_dev(svg0, "class", "svelte-tdgzmm");
    			add_location(svg0, file$5, 21, 12, 589);
    			attr_dev(button0, "title", "YouTube");
    			attr_dev(button0, "class", "svelte-tdgzmm");
    			add_location(button0, file$5, 20, 8, 487);
    			attr_dev(path1, "id", "gamejolt-logo");
    			set_style(path1, "stroke", "none");
    			set_style(path1, "stroke-linecap", "round");
    			set_style(path1, "stroke-miterlimit", "0");
    			attr_dev(path1, "d", "M 4 0 L 4 2 L 3 2 L 3 4 L 2 4 L 2 6 L 1 6 L 1 8 L 0 8 L 0 10 L 6 10 L 6 13 L 5 13 L 5 14 L 4 14 L 4 16 L 5 16 L 5 15 L 6 15 L 6 14 L 7 14 L 7 13 L 8 13 L 8 12 L 9 12 L 9 11 L 10 11 L 10 10 L 11 10 L 11 9 L 12 9 L 12 8 L 13 8 L 13 7 L 14 7 L 14 6 L 15 6 L 15 5 L 12 5 L 12 4 L 13 4 L 13 3 L 14 3 L 14 2 L 15 2 L 15 1 L 16 1 L 16 0 L 4 0 z M 4 16 L 3 16 L 3 17 L 4 17 L 4 16 z M 5 2 L 12 2 L 12 3 L 11 3 L 11 4 L 10 4 L 10 5 L 9 5 L 9 6 L 8 6 L 8 7 L 9 7 L 9 8 L 8 8 L 8 7 L 7 7 L 7 8 L 6 8 L 6 7 L 5 7 L 5 8 L 4 8 L 4 7 L 3 7 L 3.0117188 6 L 3 6 L 3.0117188 5.9980469 L 3.0117188 6 L 4 6 L 4 4 L 5 4 L 5 2 z M 4 6 L 4 7 L 5 7 L 5 6 L 4 6 z M 6 7 L 7 7 L 7 6 L 6 6 L 6 7 z M 10 7 L 11 7 L 11 8 L 10 8 L 10 7 z ");
    			add_location(path1, file$5, 41, 15, 1381);
    			attr_dev(svg1, "width", "16");
    			attr_dev(svg1, "height", "17");
    			attr_dev(svg1, "viewBox", "0 0 16 17");
    			attr_dev(svg1, "class", "svelte-tdgzmm");
    			add_location(svg1, file$5, 36, 12, 1254);
    			attr_dev(button1, "title", "GameJolt");
    			attr_dev(button1, "class", "svelte-tdgzmm");
    			add_location(button1, file$5, 35, 8, 1160);
    			attr_dev(path2, "id", "github-logo");
    			set_style(path2, "stroke-linecap", "round");
    			set_style(path2, "stroke-miterlimit", "0");
    			attr_dev(path2, "d", "M 256 0 A 256 256 0 0 0 0 256 A 256 256 0 0 0 192.9668 503.60742 C 192.9313 491.76688 192.79813 447.7772 192.78711 445.0957 C 162.76699 451.85506 147.43723 447.28769 129 441.73242 C 110.56277 436.17716 96.15947 394.10616 91.775391 389.04883 C 87.391311 383.99149 83.750269 380.72636 78.164062 377.24805 C 72.577856 373.76973 62.566838 368.4209 69.318359 363.61719 C 76.069881 358.81347 80.251033 360.37211 96.300781 366.39062 C 121.95556 380.33663 135.1736 415.90656 159.59961 415.92383 C 184.02561 415.94113 193.12109 409.71289 193.12109 409.71289 C 193.12109 409.71289 196.10678 379.71206 208.41797 375.55664 C 201.24817 374.69029 103.62731 370.30774 94.716797 282.64258 C 85.806288 194.97741 118.21484 180.88867 118.21484 180.88867 C 118.21484 180.88867 103.48479 124.31041 124.05469 111.98438 C 146.97997 107.70507 192.49609 138.53125 192.49609 138.53125 C 192.49609 138.53125 222.41382 128.96427 255.98438 129.10352 C 289.55492 129.24276 319.52344 138.51367 319.52344 138.51367 C 319.52344 138.51367 345.98965 109.41146 388.25586 111.3125 C 404.80368 131.31953 393.5 180.10742 393.5 180.10742 C 393.5 180.10742 420.64758 180.06397 415.86328 275.99414 C 411.07898 371.92427 302.46484 375.42969 302.46484 375.42969 C 302.46484 375.42969 309.09244 374.58367 315.70508 395.25391 C 321.44334 413.19094 320.09603 484.12251 319.62305 503.48047 A 256 256 0 0 0 512 256 A 256 256 0 0 0 256 0 z M 261.9668 511.57422 L 250.08789 511.57812 A 256 256 0 0 0 256 512 A 256 256 0 0 0 261.9668 511.57422 z ");
    			add_location(path2, file$5, 55, 16, 2544);
    			attr_dev(svg2, "width", "512");
    			attr_dev(svg2, "height", "512");
    			attr_dev(svg2, "viewBox", "0 0 512 512.00002");
    			attr_dev(svg2, "class", "svelte-tdgzmm");
    			add_location(svg2, file$5, 50, 12, 2403);
    			attr_dev(button2, "title", "GitHub");
    			attr_dev(button2, "class", "svelte-tdgzmm");
    			add_location(button2, file$5, 49, 8, 2313);
    			attr_dev(div, "class", "content svelte-tdgzmm");
    			add_location(div, file$5, 18, 4, 454);
    			attr_dev(button3, "class", "svelte-tdgzmm");
    			add_location(button3, file$5, 66, 4, 4259);
    			attr_dev(nav, "class", "svelte-tdgzmm");
    			add_location(nav, file$5, 16, 0, 421);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div);
    			append_dev(div, button0);
    			append_dev(button0, svg0);
    			append_dev(svg0, path0);
    			append_dev(div, t0);
    			append_dev(div, button1);
    			append_dev(button1, svg1);
    			append_dev(svg1, path1);
    			append_dev(div, t1);
    			append_dev(div, button2);
    			append_dev(button2, svg2);
    			append_dev(svg2, path2);
    			append_dev(nav, t2);
    			append_dev(nav, button3);
    			/*nav_binding*/ ctx[6](nav);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[4], false, false, false),
    					listen_dev(button2, "click", /*click_handler_2*/ ctx[5], false, false, false),
    					listen_dev(button3, "click", /*toggleFold*/ ctx[1], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			/*nav_binding*/ ctx[6](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('NavBar', slots, []);
    	let thisObj;
    	let folded = false;

    	const toggleFold = () => {
    		folded = !folded;
    		const style = getComputedStyle(thisObj);
    		const height = style.getPropertyValue('--nav-height');
    		$$invalidate(0, thisObj.style.top = folded ? `calc(-${height})` : "0", thisObj);
    	};

    	const goTo = url => {
    		window.location.href = url;
    	};

    	setTimeout(toggleFold, 2000);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<NavBar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => goTo('https://www.youtube.com/@ExediceWhyNot');
    	const click_handler_1 = () => goTo('https://gamejolt.com/@Exedice');
    	const click_handler_2 = () => goTo('https://github.com/Ex-ce-pt');

    	function nav_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			thisObj = $$value;
    			$$invalidate(0, thisObj);
    		});
    	}

    	$$self.$capture_state = () => ({ thisObj, folded, toggleFold, goTo });

    	$$self.$inject_state = $$props => {
    		if ('thisObj' in $$props) $$invalidate(0, thisObj = $$props.thisObj);
    		if ('folded' in $$props) folded = $$props.folded;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		thisObj,
    		toggleFold,
    		goTo,
    		click_handler,
    		click_handler_1,
    		click_handler_2,
    		nav_binding
    	];
    }

    class NavBar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "NavBar",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\Header.svelte generated by Svelte v3.55.1 */

    const file$4 = "src\\Header.svelte";

    function create_fragment$4(ctx) {
    	let main;
    	let div;
    	let t;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div = element("div");
    			t = space();
    			img = element("img");
    			attr_dev(div, "class", "shade svelte-k9jeps");
    			add_location(div, file$4, 2, 4, 14);
    			if (!src_url_equal(img.src, img_src_value = "../mark neo.svg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "svelte-k9jeps");
    			add_location(img, file$4, 3, 4, 45);
    			attr_dev(main, "class", "svelte-k9jeps");
    			add_location(main, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div);
    			append_dev(main, t);
    			append_dev(main, img);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\Pads.svelte generated by Svelte v3.55.1 */

    const file$3 = "src\\Pads.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[9] = list[i];
    	child_ctx[11] = i;
    	return child_ctx;
    }

    // (35:1) {#each Array(PADS_COUNT) as _, i}
    function create_each_block_1(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			set_style(div, "--activation", /*computeActivation*/ ctx[1](/*i*/ ctx[11], /*posY*/ ctx[0]));
    			attr_dev(div, "class", "svelte-1afwh32");
    			add_location(div, file$3, 36, 1, 989);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*posY*/ 1) {
    				set_style(div, "--activation", /*computeActivation*/ ctx[1](/*i*/ ctx[11], /*posY*/ ctx[0]));
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(35:1) {#each Array(PADS_COUNT) as _, i}",
    		ctx
    	});

    	return block;
    }

    // (28:0) {#each ['left-side', 'right-side'] as clz}
    function create_each_block$1(ctx) {
    	let main;
    	let t;
    	let each_value_1 = Array(PADS_COUNT);
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(main, "class", "" + (null_to_empty(/*clz*/ ctx[6]) + " svelte-1afwh32"));
    			set_style(main, "--pads-count", PADS_COUNT);
    			add_location(main, file$3, 29, 0, 879);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			append_dev(main, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*computeActivation, posY*/ 3) {
    				each_value_1 = Array(PADS_COUNT);
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(main, t);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(28:0) {#each ['left-side', 'right-side'] as clz}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let each_1_anchor;
    	let each_value = ['left-side', 'right-side'];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < 2; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < 2; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < 2; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*PADS_COUNT, Array, computeActivation, posY*/ 3) {
    				each_value = ['left-side', 'right-side'];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < 2; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < 2; i += 1) {
    					each_blocks[i].d(1);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const PADS_COUNT = 20;

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Pads', slots, []);
    	let { parent } = $$props;
    	let posY = -100;
    	let listenerSet = false;

    	const updatePos = e => {
    		const style = getComputedStyle(parent);
    		Number(style.marginTop.substring(0, style.marginTop.length - 2));
    		const offsetY = e.clientY - parent.getBoundingClientRect().y;
    		$$invalidate(0, posY = Math.floor(offsetY / parent.clientHeight * PADS_COUNT));
    	};

    	const clampActivation = a => {
    		return Math.min(Math.max(a, 0), 1);
    	};

    	const computeActivation = (i, p) => {
    		// return i === p ? 1 : 0;
    		let d = Math.abs(i - p);

    		if (d > 2) {
    			d = 9999999;
    		}

    		return clampActivation(1 / Math.pow(d + 1, 2));
    	};

    	$$self.$$.on_mount.push(function () {
    		if (parent === undefined && !('parent' in $$props || $$self.$$.bound[$$self.$$.props['parent']])) {
    			console.warn("<Pads> was created without expected prop 'parent'");
    		}
    	});

    	const writable_props = ['parent'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Pads> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('parent' in $$props) $$invalidate(2, parent = $$props.parent);
    	};

    	$$self.$capture_state = () => ({
    		parent,
    		PADS_COUNT,
    		posY,
    		listenerSet,
    		updatePos,
    		clampActivation,
    		computeActivation
    	});

    	$$self.$inject_state = $$props => {
    		if ('parent' in $$props) $$invalidate(2, parent = $$props.parent);
    		if ('posY' in $$props) $$invalidate(0, posY = $$props.posY);
    		if ('listenerSet' in $$props) $$invalidate(3, listenerSet = $$props.listenerSet);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*parent, listenerSet*/ 12) {
    			if (parent != undefined && !listenerSet) {
    				parent.addEventListener('mousemove', updatePos);
    				$$invalidate(3, listenerSet = true);
    			}
    		}
    	};

    	return [posY, computeActivation, parent, listenerSet];
    }

    class Pads extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { parent: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Pads",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get parent() {
    		throw new Error("<Pads>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set parent(value) {
    		throw new Error("<Pads>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Stack.svelte generated by Svelte v3.55.1 */
    const file$2 = "src\\Stack.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	child_ctx[7] = i;
    	return child_ctx;
    }

    // (46:4) {#each STACK as tool, i}
    function create_each_block(ctx) {
    	let div;
    	let img;
    	let img_src_value;
    	let t0;
    	let span;
    	let t1_value = /*tool*/ ctx[5].name + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t0 = space();
    			span = element("span");
    			t1 = text(t1_value);
    			t2 = space();
    			if (!src_url_equal(img.src, img_src_value = /*tool*/ ctx[5].icon)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", /*tool*/ ctx[5].name);
    			attr_dev(img, "class", "svelte-1or4yq8");
    			add_location(img, file$2, 48, 8, 1446);
    			attr_dev(span, "class", "svelte-1or4yq8");
    			add_location(span, file$2, 49, 8, 1495);
    			set_style(div, "--index", /*STACK*/ ctx[2].length - /*i*/ ctx[7] - 1);
    			attr_dev(div, "class", "svelte-1or4yq8");
    			add_location(div, file$2, 47, 4, 1391);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t0);
    			append_dev(div, span);
    			append_dev(span, t1);
    			append_dev(div, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(46:4) {#each STACK as tool, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let main;
    	let each_value = /*STACK*/ ctx[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			main = element("main");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			set_style(main, "--stack-size", /*STACK*/ ctx[2].length);
    			set_style(main, "--animation", /*animate*/ ctx[1] ? 'running' : 'paused');
    			attr_dev(main, "class", "svelte-1or4yq8");
    			add_location(main, file$2, 43, 0, 1240);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(main, null);
    			}

    			/*main_binding*/ ctx[3](main);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*STACK*/ 4) {
    				each_value = /*STACK*/ ctx[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(main, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*animate*/ 2) {
    				set_style(main, "--animation", /*animate*/ ctx[1] ? 'running' : 'paused');
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_each(each_blocks, detaching);
    			/*main_binding*/ ctx[3](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Stack', slots, []);

    	const STACK = [
    		{
    			name: "Svelte",
    			icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"
    		},
    		{
    			name: "TypeScript",
    			icon: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254474/typescript-icon-icon-md.png"
    		},
    		{
    			name: "C++",
    			icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png"
    		},
    		{
    			name: "Java",
    			icon: "https://cdn-icons-png.flaticon.com/512/226/226777.png"
    		},
    		{
    			name: "Python",
    			icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png"
    		},
    		{
    			name: "Rust",
    			icon: "http://rust-lang.org/logos/rust-logo-512x512.png"
    		}
    	];

    	let thisObj;
    	let animate = false;

    	let observer = new IntersectionObserver(e => {
    			const entry = e[0];
    			if (!entry.isIntersecting) return;
    			$$invalidate(1, animate = true);
    		},
    	{ rootMargin: '0px', threshold: 1.0 });

    	onMount(() => {
    		observer.observe(thisObj);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Stack> was created with unknown prop '${key}'`);
    	});

    	function main_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			thisObj = $$value;
    			$$invalidate(0, thisObj);
    		});
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		STACK,
    		thisObj,
    		animate,
    		observer
    	});

    	$$self.$inject_state = $$props => {
    		if ('thisObj' in $$props) $$invalidate(0, thisObj = $$props.thisObj);
    		if ('animate' in $$props) $$invalidate(1, animate = $$props.animate);
    		if ('observer' in $$props) observer = $$props.observer;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [thisObj, animate, STACK, main_binding];
    }

    class Stack extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Stack",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\SelfIntroduction.svelte generated by Svelte v3.55.1 */
    const file$1 = "src\\SelfIntroduction.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let p0;
    	let t1;
    	let section0;
    	let h20;
    	let t3;
    	let p1;
    	let t5;
    	let p2;
    	let t6;
    	let span0;
    	let t8;
    	let span1;
    	let t10;
    	let span2;
    	let t12;
    	let t13;
    	let p3;
    	let t14;
    	let span3;
    	let t16;
    	let p4;
    	let t17;
    	let span4;
    	let t19;
    	let t20;
    	let section1;
    	let h21;
    	let t22;
    	let div2;
    	let div0;
    	let p5;
    	let t24;
    	let p6;
    	let t26;
    	let p7;
    	let t28;
    	let devskills;
    	let t29;
    	let div1;
    	let p8;
    	let t30;
    	let span5;
    	let t32;
    	let span6;
    	let current;
    	devskills = new Stack({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			p0 = element("p");
    			p0.textContent = "Hi there! I'm Exedice. Glad to see you on my portfolio website!";
    			t1 = space();
    			section0 = element("section");
    			h20 = element("h2");
    			h20.textContent = "About me";
    			t3 = space();
    			p1 = element("p");
    			p1.textContent = "I'm just a regular highschooler.";
    			t5 = space();
    			p2 = element("p");
    			t6 = text("I do a variety of different things: I'm a ");
    			span0 = element("span");
    			span0.textContent = "programmer";
    			t8 = text(",\r\n            I try to make ");
    			span1 = element("span");
    			span1.textContent = "music";
    			t10 = text(" and draw ");
    			span2 = element("span");
    			span2.textContent = "pixelart";
    			t12 = text(" sometimes.\r\n            I'm not very good at it though.");
    			t13 = space();
    			p3 = element("p");
    			t14 = text("I have a quite strong self-diagnosed impostor syndrome. ");
    			span3 = element("span");
    			span3.textContent = "(now read the previous sentence again)";
    			t16 = space();
    			p4 = element("p");
    			t17 = text("I like math and chemistry. Maybe becoming a ");
    			span4 = element("span");
    			span4.textContent = "bioinformaticists?";
    			t19 = text(" Who knows?");
    			t20 = space();
    			section1 = element("section");
    			h21 = element("h2");
    			h21.textContent = "My programming knowledge";
    			t22 = space();
    			div2 = element("div");
    			div0 = element("div");
    			p5 = element("p");
    			p5.textContent = "Let's get back to programming, shall we?";
    			t24 = space();
    			p6 = element("p");
    			p6.textContent = "This is quite literally my stack!";
    			t26 = space();
    			p7 = element("p");
    			p7.textContent = "The most used tools are at the top.";
    			t28 = space();
    			create_component(devskills.$$.fragment);
    			t29 = space();
    			div1 = element("div");
    			p8 = element("p");
    			t30 = text("On top of that, I have also had some experience with\r\n                    ");
    			span5 = element("span");
    			span5.textContent = "Arduino";
    			t32 = text(" and ");
    			span6 = element("span");
    			span6.textContent = "Unity";
    			attr_dev(p0, "class", "svelte-kkr4j0");
    			add_location(p0, file$1, 5, 4, 86);
    			attr_dev(h20, "class", "svelte-kkr4j0");
    			add_location(h20, file$1, 8, 8, 183);
    			attr_dev(p1, "class", "svelte-kkr4j0");
    			add_location(p1, file$1, 9, 8, 210);
    			attr_dev(span0, "class", "trait svelte-kkr4j0");
    			add_location(span0, file$1, 13, 54, 342);
    			attr_dev(span1, "class", "trait svelte-kkr4j0");
    			add_location(span1, file$1, 14, 26, 408);
    			attr_dev(span2, "class", "trait svelte-kkr4j0");
    			add_location(span2, file$1, 14, 68, 450);
    			attr_dev(p2, "class", "svelte-kkr4j0");
    			add_location(p2, file$1, 12, 8, 283);
    			attr_dev(span3, "class", "small svelte-kkr4j0");
    			add_location(span3, file$1, 18, 68, 638);
    			attr_dev(p3, "class", "svelte-kkr4j0");
    			add_location(p3, file$1, 17, 8, 565);
    			attr_dev(span4, "class", "trait svelte-kkr4j0");
    			add_location(span4, file$1, 21, 56, 788);
    			attr_dev(p4, "class", "svelte-kkr4j0");
    			add_location(p4, file$1, 20, 8, 727);
    			attr_dev(section0, "class", "svelte-kkr4j0");
    			add_location(section0, file$1, 7, 4, 164);
    			attr_dev(h21, "class", "svelte-kkr4j0");
    			add_location(h21, file$1, 26, 8, 921);
    			attr_dev(p5, "class", "svelte-kkr4j0");
    			add_location(p5, file$1, 29, 16, 1006);
    			attr_dev(p6, "class", "svelte-kkr4j0");
    			add_location(p6, file$1, 30, 16, 1071);
    			attr_dev(p7, "class", "svelte-kkr4j0");
    			add_location(p7, file$1, 31, 16, 1129);
    			add_location(div0, file$1, 28, 12, 983);
    			attr_dev(span5, "class", "trait svelte-kkr4j0");
    			add_location(span5, file$1, 37, 20, 1354);
    			attr_dev(span6, "class", "trait svelte-kkr4j0");
    			add_location(span6, file$1, 37, 59, 1393);
    			attr_dev(p8, "class", "svelte-kkr4j0");
    			add_location(p8, file$1, 35, 16, 1255);
    			add_location(div1, file$1, 34, 12, 1232);
    			attr_dev(div2, "class", "svelte-kkr4j0");
    			add_location(div2, file$1, 27, 8, 964);
    			attr_dev(section1, "class", "programming svelte-kkr4j0");
    			add_location(section1, file$1, 25, 4, 882);
    			attr_dev(main, "class", "svelte-kkr4j0");
    			add_location(main, file$1, 3, 0, 72);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, p0);
    			append_dev(main, t1);
    			append_dev(main, section0);
    			append_dev(section0, h20);
    			append_dev(section0, t3);
    			append_dev(section0, p1);
    			append_dev(section0, t5);
    			append_dev(section0, p2);
    			append_dev(p2, t6);
    			append_dev(p2, span0);
    			append_dev(p2, t8);
    			append_dev(p2, span1);
    			append_dev(p2, t10);
    			append_dev(p2, span2);
    			append_dev(p2, t12);
    			append_dev(section0, t13);
    			append_dev(section0, p3);
    			append_dev(p3, t14);
    			append_dev(p3, span3);
    			append_dev(section0, t16);
    			append_dev(section0, p4);
    			append_dev(p4, t17);
    			append_dev(p4, span4);
    			append_dev(p4, t19);
    			append_dev(main, t20);
    			append_dev(main, section1);
    			append_dev(section1, h21);
    			append_dev(section1, t22);
    			append_dev(section1, div2);
    			append_dev(div2, div0);
    			append_dev(div0, p5);
    			append_dev(div0, t24);
    			append_dev(div0, p6);
    			append_dev(div0, t26);
    			append_dev(div0, p7);
    			append_dev(div2, t28);
    			mount_component(devskills, div2, null);
    			append_dev(div2, t29);
    			append_dev(div2, div1);
    			append_dev(div1, p8);
    			append_dev(p8, t30);
    			append_dev(p8, span5);
    			append_dev(p8, t32);
    			append_dev(p8, span6);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(devskills.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(devskills.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(devskills);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SelfIntroduction', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SelfIntroduction> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ DevSkills: Stack });
    	return [];
    }

    class SelfIntroduction extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SelfIntroduction",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.1 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let navbar;
    	let t0;
    	let header;
    	let t1;
    	let div;
    	let pads;
    	let t2;
    	let selfintroduction;
    	let current;
    	navbar = new NavBar({ $$inline: true });
    	header = new Header({ $$inline: true });

    	pads = new Pads({
    			props: { parent: /*content*/ ctx[0] },
    			$$inline: true
    		});

    	selfintroduction = new SelfIntroduction({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(navbar.$$.fragment);
    			t0 = space();
    			create_component(header.$$.fragment);
    			t1 = space();
    			div = element("div");
    			create_component(pads.$$.fragment);
    			t2 = space();
    			create_component(selfintroduction.$$.fragment);
    			attr_dev(div, "class", "content svelte-12pgg1j");
    			add_location(div, file, 13, 1, 250);
    			attr_dev(main, "class", "svelte-12pgg1j");
    			add_location(main, file, 7, 0, 215);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(navbar, main, null);
    			append_dev(main, t0);
    			mount_component(header, main, null);
    			append_dev(main, t1);
    			append_dev(main, div);
    			mount_component(pads, div, null);
    			append_dev(div, t2);
    			mount_component(selfintroduction, div, null);
    			/*div_binding*/ ctx[1](div);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const pads_changes = {};
    			if (dirty & /*content*/ 1) pads_changes.parent = /*content*/ ctx[0];
    			pads.$set(pads_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);
    			transition_in(header.$$.fragment, local);
    			transition_in(pads.$$.fragment, local);
    			transition_in(selfintroduction.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			transition_out(header.$$.fragment, local);
    			transition_out(pads.$$.fragment, local);
    			transition_out(selfintroduction.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(navbar);
    			destroy_component(header);
    			destroy_component(pads);
    			destroy_component(selfintroduction);
    			/*div_binding*/ ctx[1](null);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let content;
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			content = $$value;
    			$$invalidate(0, content);
    		});
    	}

    	$$self.$capture_state = () => ({
    		NavBar,
    		Header,
    		Pads,
    		SelfIntroduction,
    		content
    	});

    	$$self.$inject_state = $$props => {
    		if ('content' in $$props) $$invalidate(0, content = $$props.content);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [content, div_binding];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
