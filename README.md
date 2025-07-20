# BiteSpeed Frontend Task: Chatbot Flow Builder

A modern, responsive chatbot flow builder built with React, React Flow, and Tailwind CSS as part of the BiteSpeed frontend interview process. This project demonstrates the ability to create an extensible flow builder with drag-and-drop functionality, real-time editing, and intelligent validation.

## 🚀 Live Demo

**Deployed Application:** [https://flow-builder-63lx.vercel.app/](https://flow-builder-63lx.vercel.app/)

**GitHub Repository:** [https://github.com/AryanThadani02/Flow-Builder](https://github.com/AryanThadani02/Flow-Builder)

## 📋 Task Overview

**BiteSpeed Frontend Task: Chatbot flow builder**

We'll build a simple Chatbot flow builder using React and try to make the code extensible to easily add new features. A chatbot flow is built by connecting multiple messages together to decide the order of execution.

## 🎯 Task Requirements

### Core Features Implemented

#### 1. **Text Node**
- ✅ Our flow builder currently supports only one type of message (i.e Text Message)
- ✅ There can be multiple Text Nodes in one flow
- ✅ Nodes are added to the flow by dragging and dropping a Node from the Nodes Panel

#### 2. **Nodes Panel**
- ✅ This panel houses all kind of Nodes that our Flow Builder supports
- ✅ Right now there is only Message Node, but we'd be adding more types of Nodes in the future so make this section extensible

#### 3. **Edge**
- ✅ Connects two Nodes together

#### 4. **Source Handle**
- ✅ Source of a connecting edge
- ✅ Can only have **one edge** originating from a source handle

#### 5. **Target Handle**
- ✅ Target of a connecting edge
- ✅ Can have **more than one edge** connecting to a target handle

#### 6. **Settings Panel**
- ✅ Settings Panel will replace the Nodes Panel when a Node is selected
- ✅ It has a text field to edit text of the selected Text Node

#### 7. **Save Button**
- ✅ Button to save the flow
- ✅ Save button press will show an error if there are more than one Nodes and more than one Node has empty target handles

## 🛠️ Technology Stack

- **React 18**: Modern React with hooks for state management
- **React Flow**: Professional flow diagram library for node-based interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **JavaScript**: ES6+ features for clean, maintainable code

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development
```bash
# Clone the repository
git clone https://github.com/AryanThadani02/Flow-Builder.git
cd flow

# Install dependencies
npm install

# Start development server
npm start

# Open in browser
# Navigate to http://localhost:3000
```

## 🎮 How to Use

### Creating a Flow

1. **Add Text Nodes**
   - Drag a "Text Message" node from the Nodes Panel to the canvas
   - Position nodes where you want them in your flow

2. **Connect Nodes**
   - Click and drag from a node's right handle (source) to another node's left handle (target)
   - Each source handle can only have one outgoing connection
   - Target handles can receive multiple incoming connections

3. **Edit Node Content**
   - Click on any node to select it
   - The Settings Panel will appear on the right
   - Edit the node title and message content
   - Changes are applied in real-time

4. **Save Your Flow**
   - Click the "Save Changes" button
   - The system validates your flow structure
   - You'll see a success message if validation passes

### Flow Validation Rules

The save button validates your flow based on these rules:
- **Single Node**: Always valid
- **Multiple Nodes**: Only one node can have empty target handles (no incoming connections)
- **Error Case**: If multiple nodes have no incoming connections, save is blocked

### Navigation

- **Nodes Panel**: Shows when no node is selected
- **Settings Panel**: Shows when a node is selected
- **Back Navigation**: Click the hamburger icon (☰) to return to Nodes Panel
- **Deselect**: Click outside nodes to return to Nodes Panel

## 🎨 Features Implemented

### Core Functionality
- ✅ **Text Node Support**: Create and manage text message nodes
- ✅ **Drag & Drop Interface**: Intuitive node placement with visual feedback
- ✅ **Smart Edge Management**: Connect nodes with intelligent edge constraints
- ✅ **Real-time Editing**: Edit node content and labels in a dedicated settings panel
- ✅ **Flow Validation**: Built-in validation to ensure proper flow structure
- ✅ **Extensible Architecture**: Easy to add new node types in the future

### User Experience
- ✅ **Modern UI**: Clean, responsive design with Tailwind CSS
- ✅ **Hover Effects**: Smooth transitions and visual feedback
- ✅ **Error Handling**: Clear error messages for validation issues
- ✅ **Success Feedback**: Confirmation messages for successful operations
- ✅ **Mobile Responsive**: Works on desktop and tablet devices

### Design System
- **Color Palette**: Slate grays with blue accents
- **Typography**: Consistent font weights and sizes
- **Spacing**: Uniform padding and margins
- **Shadows**: Subtle depth and elevation
- **Transitions**: Smooth hover and focus states

## 🏗️ Project Architecture

### Component Structure
```
src/
├── App.js                 # Main application component
├── components/
│   ├── BaseNode.jsx       # Base node component (extensible)
│   ├── TextNode.jsx       # Text message node implementation
│   ├── NodesPanel.jsx     # Node selection panel
│   ├── SettingsPanel.jsx  # Node editing panel
│   ├── SaveButton.jsx     # Flow save functionality
│   └── ErrorNotification.jsx # Error/success notifications
├── index.js              # Application entry point
└── index.css             # Tailwind CSS and React Flow styles
```

### Key Design Decisions

1. **Tailwind CSS**: Utility-first approach for rapid development and consistent styling
2. **Component-Based**: Modular architecture for maintainability
3. **Event-Driven**: Custom events for node communication
4. **Extensible**: BaseNode component allows easy addition of new node types

### Extensibility Features

The architecture is designed for easy extension:

1. **Add New Node Types**:
   ```javascript
   // In NodesPanel.jsx
   const nodeTypes = [
     {
       type: "textNode",
       label: "Text Message",
       icon: "💬",
       description: "Send a text message",
       color: "#3b82f6",
     },
     // Add new node types here
     {
       type: "imageNode",
       label: "Image Message", 
       icon: "🖼️",
       description: "Send an image",
       color: "#10b981",
     }
   ];
   ```

2. **Create Node Components**:
   ```javascript
   // Create ImageNode.jsx extending BaseNode
   const ImageNode = ({ data, selected, id }) => {
     return (
       <BaseNode
         id={id}
         data={data}
         selected={selected}
         nodeType="image"
         icon="🖼️"
       >
         {/* Custom image content */}
       </BaseNode>
     );
   };
   ```

3. **Register in App.js**:
   ```javascript
   const nodeTypes = {
     textNode: TextNode,
     imageNode: ImageNode, // Add new node type
   };
   ```

## 🎨 Tailwind CSS Implementation

### Why Tailwind CSS?
- **Rapid Development**: Utility classes for quick styling
- **Consistent Design**: Built-in design system
- **Responsive**: Mobile-first responsive design
- **No CSS Files**: All styling in components
- **Modern Look**: Clean, professional appearance

### Key Tailwind Features Used:
- **Flexbox Layout**: `flex`, `items-center`, `justify-between`
- **Grid System**: Responsive design patterns
- **Color System**: Slate grays with blue accents
- **Spacing**: Consistent padding and margins
- **Typography**: Font weights, sizes, and colors
- **Effects**: Shadows, transitions, and hover states
- **Responsive**: Mobile and tablet breakpoints

### Custom React Flow Styling:
- **Node Styling**: Custom borders, shadows, and hover effects
- **Handle Styling**: Connection point styling
- **Edge Styling**: Path colors and thickness
- **Controls**: Button and minimap styling

## 📋 Task Submission

### Submission Requirements Met:
1. ✅ **Working Version**: Fully functional chatbot flow builder
2. ✅ **Extensible Code**: Easy to add new node types
3. ✅ **React Flow Integration**: Using https://reactflow.dev/
4. ✅ **Code Comments**: Comprehensive documentation
5. ✅ **All Features**: Complete implementation of all required features
6. ✅ **Modern Styling**: Tailwind CSS for professional appearance

### Next Steps for Submission:
1. Deploy to a free hosting service (Vercel, Netlify, Heroku, etc.)
2. Update the deployment link in this README
3. Submit via the BiteSpeed form: https://forms.gle/hQQtbsp53077

## 🤝 About the Developer

This project was built as part of the BiteSpeed frontend interview process, demonstrating:
- **React Proficiency**: Modern React patterns and best practices
- **Problem Solving**: Complex state management and validation logic
- **Code Quality**: Clean, maintainable, and well-documented code
- **Extensibility**: Future-proof architecture for easy feature additions
- **Modern Styling**: Tailwind CSS implementation for professional UI
- **User Experience**: Intuitive interface with proper feedback

## 🚀 Deployment

This project is ready for deployment on:
- **Vercel**: Zero-config deployment (recommended)
- **Netlify**: Easy static site hosting
- **Heroku**: Node.js deployment support
- **GitHub Pages**: Free hosting for static sites

## 📝 License

This project is created for the BiteSpeed frontend interview task.

---

**Built with ❤️ for BiteSpeed Frontend Task using React, React Flow, and Tailwind CSS**
