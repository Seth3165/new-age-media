import axios from "axios";

export const getSigPut = file => (dispatch, getState) => {
  getSignedRequest(file);
};

function getSignedRequest(file){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        const response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

function uploadFile(file, signedRequest, url){
  const xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        console.log(url);
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}

// export const uploadFile = file => (dispatch, getState) => {
//   let {currentUser} = getState();
//   const id = currentUser.user.id;
  
//   return new Promise((resolve, reject) => {
//     return axios.post(`/api/users/${id}/uploads`, file).then(res => {
//       return resolve(res.data);
//     }).catch(err => {
//       return reject(err);
//     });
//   });
// };

// export const getSigPut = file => (dispatch, getState) => {
//   let {currentUser} = getState();
//   const id = currentUser.user.id;
  
//   return new Promise((resolve, reject) => {
//     return axios.get(`/api/users/${id}/uploads`, {
//       filename: file.name,
//       filetype: file.type
//     })
//     .then(res => {
//         let signedUrl = res.data.signedUrl;
//         let options = {
//           headers: { "Content-Type": file.type }
//         };
        
//         return axios.put(signedUrl, file, options);
//       })
//       .then(function (result) {
//         console.log(result);
//       })
//       .catch(err => {
//         return reject(err);
//     });
//   });

  // const xhr = new XMLHttpRequest();
  // xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  // xhr.onreadystatechange = () => {
  //   if(xhr.readyState === 4){
  //     if(xhr.status === 200){
  //       const response = JSON.parse(xhr.responseText);
  //       uploadFile(file, response.signedRequest, response.url);
  //     }
  //     else{
  //       alert('Could not get signed URL.');
  //     }
  //   }
  // };
  // xhr.send();
// };


// export const uploadFile = (file, signedRequest, url) => (dispatch, getState) => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('PUT', signedRequest);
//   xhr.onreadystatechange = () => {
//     if(xhr.readyState === 4){
//       if(xhr.status === 200){
//         alert('Uploaded.');
//       }
//       else{
//         alert('Could not upload file.');
//       }
//     }
//   };
//   xhr.send(file);
// };