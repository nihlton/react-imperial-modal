import { jsx as j, jsxs as A } from "react/jsx-runtime";
import D, { useRef as R, useContext as O, useLayoutEffect as K, useCallback as u, useState as L, useMemo as q } from "react";
const S = () => {
  let s, o;
  return { promise: new Promise((l, n) => {
    s = l, o = n;
  }), resolve: s, reject: o };
}, I = "Escape", N = [
  "a[href]:not([tabindex='-1'])",
  "area[href]:not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "iframe:not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
  "[contentEditable=true]:not([tabindex='-1'])"
].join(", "), k = /* @__PURE__ */ (() => {
  let s = 1;
  return () => "modal_" + (s++ * 1664525 + 1013904223 >>> 0).toString(36);
})(), _ = function({ className: s, entry: o }) {
  const { role: M = "dialog", label: l, labelledby: n, componentProps: v, Component: b } = o, d = R(null), { removeModal: c } = O(C);
  K(() => {
    requestAnimationFrame(() => {
      var a;
      d.current && (d.current.showModal(), (a = d.current.querySelector(N)) == null || a.focus());
    });
  }, []);
  const f = u(
    (a) => {
      a.key === I && !o.ignoreEscape && c(o.id);
    },
    [o, c]
  );
  return /* @__PURE__ */ j(
    "dialog",
    {
      ref: d,
      role: M,
      "aria-label": l,
      "aria-labelledby": n,
      className: s,
      onKeyDown: f,
      children: /* @__PURE__ */ j(
        b,
        {
          modalId: o.id,
          close: o.closeModal,
          resolve: o.resolveModal,
          reject: o.rejectModal,
          ...v
        }
      )
    }
  );
}, y = () => {
  throw new Error(
    "Attempted to call useModal outside of modal context. Make sure your component is inside ModalProvider."
  );
}, C = D.createContext({
  addModal: y,
  removeModal: y,
  resolveModal: y,
  rejectModal: y
}), g = document.documentElement, P = document.body, T = ({ children: s, config: o = {} }) => {
  const [M, l] = L([]), n = R(null), v = R([]), b = u(() => {
    var e;
    o.bodyOpenClass && P.classList.add(o.bodyOpenClass), (e = n == null ? void 0 : n.current) == null || e.setAttribute("aria-hidden", "true"), g.style.overflow = "hidden";
  }, [o]), d = u(() => {
    var e;
    o.bodyOpenClass && P.classList.remove(o.bodyOpenClass), (e = n == null ? void 0 : n.current) == null || e.removeAttribute("aria-hidden"), g.style.overflow = "";
  }, [o]), c = u(
    (e) => {
      l((t) => t.includes(e) ? t : (t.length === 0 && b(), v.current.push(document.activeElement), [...t, e]));
    },
    [b]
  ), f = u(
    (e) => {
      l((t) => {
        const m = t.at(-1), E = t.find((w) => w.id === e), x = e === void 0 ? m : E, r = t.length === 1, h = v.current.pop();
        return !x || !t.includes(x) ? t : (r && h && g.contains(h) && h.focus(), r && d(), t.filter((w) => x !== w));
      });
    },
    [d]
  ), a = u((e, t) => {
    l((m) => {
      const E = m.at(-1), x = m.find((h) => h.id === t), r = t === void 0 ? E : x;
      return r == null || r.resolveModal(e), m;
    });
  }, []), i = u((e, t) => {
    l((m) => {
      const E = m.at(-1), x = m.find((h) => h.id === t), r = t === void 0 ? E : x;
      return r == null || r.rejectModal(e), m;
    });
  }, []), p = q(
    () => ({ addModal: c, removeModal: f, resolveModal: a, rejectModal: i }),
    [c, f, a, i]
  );
  return /* @__PURE__ */ A(C.Provider, { value: p, children: [
    /* @__PURE__ */ j("div", { ref: n, children: s }),
    /* @__PURE__ */ j("div", { className: o.modalContainerClass, children: M.map((e) => /* @__PURE__ */ j(_, { className: o.modalClass, entry: e }, e.id)) })
  ] });
}, V = () => {
  const s = O(C);
  return u(
    (o, M, l = !1, n, v, b = "dialog") => {
      const { promise: d, resolve: c, reject: f } = S(), a = k(), i = () => s.removeModal(a), p = Object.assign(d, {
        id: a,
        Component: o,
        componentProps: M,
        ignoreEscape: l,
        labelledby: v,
        label: n,
        role: b,
        resolveModal: (e) => {
          c(e), i();
        },
        rejectModal: (e) => {
          f(e), i();
        },
        closeModal: i
      });
      return s.addModal(p), p;
    },
    [s]
  );
}, W = () => {
  const s = O(C);
  return [u(
    (M, l, n = !1, v, b, d = "dialog") => {
      const { promise: c, resolve: f, reject: a } = S(), i = k(), p = () => s.removeModal(i), e = Object.assign(c, {
        id: i,
        Component: M,
        componentProps: l,
        ignoreEscape: n,
        labelledby: b,
        label: v,
        role: d,
        resolveModal: (t) => {
          f(t), p();
        },
        rejectModal: (t) => {
          a(t), p();
        },
        closeModal: p
      });
      return s.addModal(e), e;
    },
    [s]
  ), s.removeModal, s.resolveModal, s.rejectModal];
};
export {
  T as ModalProvider,
  V as useModal,
  W as useModalDangerously
};
