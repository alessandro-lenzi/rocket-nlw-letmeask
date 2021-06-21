
type ButtonProps = {
  label?: string,
  children?: string,
};

export function Button(props: ButtonProps) {
  return (
    <button>{props.label || props.children || 'empty'}</button>
  );
}
