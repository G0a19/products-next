// The main wrapper in the project
import "./../../styles/ui/_wrapper.module.scss";

const Wrapper = ({ classNames, children }) => {
  return <div className={"wrapper " + (classNames ?? "")}>{children}</div>;
};

export default Wrapper;
