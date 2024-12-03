
interface ContainerProps {
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div id="container" className="p-2 w-full h-full max-w-6xl flex flex-row border border-yellow-600 border-dashed">
      {children}
    </div>
  );
}

export default Container;
