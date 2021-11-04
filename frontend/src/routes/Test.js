// import React from 'react'
// import { ReactQuill } from 'react-quill';

// class Test extends React.Component {
//     constructor(props) {
//         super(props)
//         this.quillRef = null;      // Quill instance
//         this.reactQuillRef = null; // ReactQuill component
//     }

//     componentDidMount() {
//         this.attachQuillRefs()
//     }

//     componentDidUpdate() {
//         this.attachQuillRefs()
//     }

//     attachQuillRefs = () => {
//         if (typeof this.reactQuillRef.getEditor !== 'function') return;
//         this.quillRef = this.reactQuillRef.getEditor();
//     }

//     insertText = () => {
//         var range = this.quillRef.getSelection();
//         let position = range ? range.index : 0;
//         this.quillRef.insertText(position, 'Hello, World! ')
//     }

//     render() {
//         return (
//             <div>
//                 <ReactQuill
//                     ref={(el) => { this.reactQuillRef = el }}
//                     theme={'snow'} />
//                 <button onClick={this.insertText}>Insert Text</button>
//             </div>
//         )
//     }
// }

// export default Test
