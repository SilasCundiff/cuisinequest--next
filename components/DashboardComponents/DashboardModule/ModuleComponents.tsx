export interface HeadingProps {
  /**
   * expects a short string as a heading
   */
  children: string;
}

export interface ParagraphProps {
  /**
   * expects a paragraph describing the module's purpose
   */
  children: string;
}

export interface ContainerProps {
  /**
   * expects either the heading and paragraph or the functional module
   */
  children: JSX.Element | JSX.Element[];
}
/**
 *  A short h2 component to label the module
 */
export const Heading = ({ children }: HeadingProps) => (
  <h2 className='text-green-500 text-5xl font-bold mb-5'>{children}</h2>
);
/**
 * A paragraph component to describe the module
 */
export const Paragraph = ({ children }: ParagraphProps) => (
  <p className='text-gray-500 text-lg font-bold'>{children}</p>
);
/**
 *  A container for the heading + paragraph, or the functional component of the module
 */
export const Container = ({ children }: ContainerProps) => (
  <div className='mb-8'>{children}</div>
);
