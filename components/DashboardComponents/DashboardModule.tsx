import {
  Heading,
  Paragraph,
  Container,
  HeadingProps,
  ParagraphProps,
  ContainerProps,
} from './DashboardModule/ModuleComponents';

interface DashboardComposition {
  Heading: React.FC<HeadingProps>;
  Paragraph: React.FC<ParagraphProps>;
  Container: React.FC<ContainerProps>;
}

const DashboardModule: React.FC & DashboardComposition = (props) => {
  return <div>{props.children}</div>;
};

DashboardModule.Heading = Heading;
DashboardModule.Paragraph = Paragraph;
DashboardModule.Container = Container;

export default DashboardModule;
