import { useEffect, useState, useCallback } from 'react';

export interface CssVariable {
  name: string;
  value: string;
}

export interface ElementVariables {
  element: string;
  variables: CssVariable[];
  error: string | null;
}

const useCSSVariables = (selector: string): ElementVariables => {
  const [variablesData, setVariablesData] = useState<ElementVariables>({
    element: selector,
    variables: [],
    error: null,
  });

  const getAllCSSVariableNames = useCallback(
    (styleSheets: StyleSheetList): string[] => {
      let cssVars: Set<string> = new Set();
      Array.from(styleSheets).forEach((styleSheet) => {
        try {
          Array.from((styleSheet as CSSStyleSheet).cssRules).forEach((rule) => {
            const style = (rule as CSSStyleRule).style;
            Array.from(style).forEach((name) => {
              if (name.startsWith('--')) {
                cssVars.add(name);
              }
            });
          });
        } catch (error) {
          console.error('Error accessing stylesheet', error);
        }
      });
      return Array.from(cssVars);
    },
    []
  );

  const getElementCSSVariables = useCallback(
    (allCSSVars: string[], el: Element): CssVariable[] => {
      let cssVars: CssVariable[] = [];
      let elStyles = window.getComputedStyle(el);
      allCSSVars.forEach((key) => {
        let value = elStyles.getPropertyValue(key).trim();
        if (value) {
          cssVars.push({ name: key, value });
        }
      });
      return cssVars;
    },
    []
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector(selector);
      if (!element) {
        setVariablesData({
          element: selector,
          variables: [],
          error: `No element found for selector: ${selector}`,
        });
        return;
      }

      const cssVars = getAllCSSVariableNames(document.styleSheets);
      const variables = getElementCSSVariables(cssVars, element);
      setVariablesData({
        element: selector,
        variables,
        error: null,
      });
    }
  }, [selector, getAllCSSVariableNames, getElementCSSVariables]);

  return variablesData;
};

export default useCSSVariables;
