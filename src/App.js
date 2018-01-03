import React from 'react'
import { Tab } from 'semantic-ui-react';
import Text from './component/text';
import File from './component/file'



const panes = [
  { menuItem: 'Text', render: () => <Tab.Pane><Text/></Tab.Pane> },
  { menuItem: 'File', render: () => <Tab.Pane><File/></Tab.Pane> }
]

const App = () => (
  <Tab panes={panes} />
)

export default App
