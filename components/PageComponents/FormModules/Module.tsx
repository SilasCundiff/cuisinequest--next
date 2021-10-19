import {
  Container,
  ContainerProps,
  Heading,
  HeadingProps,
  Paragraph,
  ParagraphProps,
} from './ModuleComponents/ModuleComponents';

interface DashboardComposition {
  Heading: React.FC<HeadingProps>;
  Paragraph: React.FC<ParagraphProps>;
  Container: React.FC<ContainerProps>;
}

const DashboardModule: React.FC & DashboardComposition = (props) => {
  return <div className='mb-14'>{props.children}</div>;
};

DashboardModule.Heading = Heading;
DashboardModule.Paragraph = Paragraph;
DashboardModule.Container = Container;

export default DashboardModule;
