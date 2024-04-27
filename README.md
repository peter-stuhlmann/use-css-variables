# useCSSVariables

`useCSSVariables` is a React custom hook designed to easily fetch and list all CSS custom properties (variables) applied to a specified element.

The useCSSVariables hook accepts a selector as parameter: A string that specifies the CSS selector of the element you want to inspect.

## Usage

```jsx
const { element, variables, error } = useCSSVariables(":root") 
```

It returns an object with the following properties:

- element: `string` - The CSS selector used.
- variables: `Array<{ name: string; value: string }>` - A list of CSS variables applied to the element.
- error: `string | null` - Error message if the element is not found or any other error occurs.

## License

This project, developed by [Peter R. Stuhlmann](https://peter-stuhlmann-webentwicklung.de), is licensed under the [MIT License](/LICENSE).
