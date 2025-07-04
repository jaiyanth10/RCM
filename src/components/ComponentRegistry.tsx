import { useContext, useEffect } from 'react';
import { ConfigContext } from '../providers/ConfigContext';
import { createComponent, createComponentElement } from '../utils/registry';

// Import component and its elements
import DiscussionsComponent from './reusable/discussions/DiscussionsComponent';
import Heading from './reusable/discussions/Heading';
import TextBox from './reusable/discussions/TextBox';
import AddButton from './reusable/discussions/AddButton';
import DiscussionsList from './reusable/discussions/DiscussionsList';

const ComponentRegistry: React.FC = () => {
  const { registerComponent } = useContext(ConfigContext);

  useEffect(() => {
    console.log('ComponentRegistry initializing...');
    // Create elements for the Discussions component
    const headingElement = createComponentElement(
      'Heading',
      Heading as React.ComponentType,
      true // optional
    );

    const textboxElement = createComponentElement(
      'Text Box',
      TextBox as React.ComponentType,
      false // required
    );

    const addButtonElement = createComponentElement(
      'Add Button',
      AddButton as React.ComponentType,
      false // required
    );

    const discussionsListElement = createComponentElement(
      'Discussions List',
      DiscussionsList as React.ComponentType,
      false // required
    );

    // Register the Discussions component
    const discussionsComponent = createComponent(
      'Discussions',
      'A reusable component for managing discussions',
      DiscussionsComponent as React.ComponentType,
      [
        headingElement,
        textboxElement,
        addButtonElement,
        discussionsListElement
      ]
    );

    // Hard-code the component ID for our demo
    Object.assign(discussionsComponent, { id: 'discussions' });

    // changing the id of each child element to fixed id's for demo purposes
    Object.assign(headingElement, { id: 'heading' });
    Object.assign(textboxElement, { id: 'textbox' });
    Object.assign(addButtonElement, { id: 'addButton' });
    Object.assign(discussionsListElement, { id: 'discussionsList' });

    // Register the component with the context
    registerComponent(discussionsComponent);
    console.log('Registered discussions component:', discussionsComponent);
  }, [registerComponent]);

  return null;
};

export default ComponentRegistry;
