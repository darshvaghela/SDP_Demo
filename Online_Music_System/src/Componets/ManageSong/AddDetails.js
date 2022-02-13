import React, { useState, useEffect }from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
import storage from '../fire'

import Navbar from '../Navbar'

// export default function AddDetails() {
//     const [image, setImage] = useState("");
//     const [imageprogress, setImageprogress] = useState(0)

//     const imageUplaod = () => {
//             const uploadTask = storage.ref(`/images/${image.name}`).put(image);
//             uploadTask.on(
//                 "state_changed",
//                 snapshot => {
//                     const progress = Math.round(
//                         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                     );
//                     setImageprogress(progress);
//                 },
//                 error => {
//                     console.log(error);
//                 },
//                 () => {
//                     storage
//                         .ref("images")
//                         .child(image.name)
//                         .getDownloadURL()
//                         .then(url => {
//                             setImageurl(url);
//                             setData({ imageLink: url })
//                             console.log(url);
                          
//                         });
//                 }
//             );
    
//         }
//   return <div>
//       <Navbar />
//       {/* <div className="container my-4">
//           <h2>Add Song Details</h2>
//           <hr/>
//           <div className="mb-3 row my-4">
//                     <label className="col-sm-2 col-form-label">Add Poster</label>
//                     <div className="col-sm-10">
//                         <input type="file" className="form-control w-50" onChange={(e) => { setImage(e.target.files[0]) }} />
//                     </div>
//                 </div>

//                 <div className="mb-3 row my-4">
//                     <div className="col-sm-6">
//                         <ProgressBar completed={imageprogress} bgColor="blue" className="w-100" />
//                     </div>
//                     <div className="col-sm-6">
//                         <button className="btn btn-primary rounded" onClick={imageUplaod}>Upload</button>
//                     </div>

//                 </div>
//           </div>  */}
//   </div>;
// }
