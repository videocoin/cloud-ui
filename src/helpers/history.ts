const getLocation = (source: any) => {
  const { pathname, search, hash } = source.location;

  return {
    pathname,
    search,
    hash,
    state: source.history.state,
    key: (source.history.state && source.history.state.key) || 'initial',
  };
};

const createHistory = (source: any, options: any) => {
  let listeners: any = [];
  let location = getLocation(source);
  let transitioning = false;
  let resolveTransition = (): any => null;
  let isBlocked = false;
  let blockedFn: any = null;
  let blockedNav: any = null;

  return {
    get location() {
      return location;
    },

    get transitioning() {
      return transitioning;
    },

    // eslint-disable-next-line no-underscore-dangle
    _onTransitionComplete() {
      transitioning = false;
      resolveTransition();
    },

    listen(listener: any) {
      listeners.push(listener);

      const popstateListener = () => {
        location = getLocation(source);
        listener({ location, action: 'POP' });
      };

      source.addEventListener('popstate', popstateListener);

      return () => {
        source.removeEventListener('popstate', popstateListener);
        listeners = listeners.filter((fn: any) => fn !== listener);
      };
    },
    block(prompt: any) {
      blockedFn = prompt;

      if (!isBlocked) {
        isBlocked = true;
      }

      return () => {
        if (isBlocked) {
          isBlocked = false;
          this.navigate(blockedNav);
        }
      };
    },
    navigate(
      to: string,
      { state, replace = false }: { state?: any; replace?: boolean } = {},
    ) {
      if (isBlocked) {
        blockedFn();
        blockedNav = to;

        return false;
      }
      if (typeof to === 'number') {
        source.history.go(to);
      } else {
        // eslint-disable-next-line no-param-reassign
        state = { ...state, key: `${Date.now()}` };
        // try...catch iOS Safari limits to 100 pushState calls
        try {
          if (transitioning || replace) {
            source.history.replaceState(state, null, to);
          } else {
            source.history.pushState(state, null, to);
          }
        } catch (e) {
          source.location[replace ? 'replace' : 'assign'](to);
        }
      }

      location = getLocation(source);
      transitioning = true;
      // eslint-disable-next-line no-return-assign
      const transition = new Promise((res) => (resolveTransition = res));

      listeners.forEach((listener: any) =>
        listener({ location, action: 'PUSH' }),
      );

      return transition;
    },
  };
};

export default createHistory;
