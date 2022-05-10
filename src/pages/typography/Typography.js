// import React,{useState} from "react";
// import { Grid } from "@material-ui/core";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
// import axios from 'axios';

// // styles
// import useStyles from "./styles";

// // components
// import Widget from "../../components/Widget";
// import { Typography } from "../../components/Wrappers";

export default function TypographyPage() {
//   var classes = useStyles();
//   const [file, setFile] = useState();
//   const [fileName, setFileName] = useState("");

//   const saveFile = (e) => {
//     setFile(e.target.files[0]);
//     setFileName(e.target.files[0].name);
//   };


  
//   return (
    
//     <>

//         <div className="TypographyPage">
//           <input type="file" onChange={saveFile} />
//           <button onClick={uploadFile}>Upload</button>
//         </div>
//     </>
//   );
// }

// import React,{useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';
 
// const uploadFile = async (e) => {
//   const formData = new FormData();
//   try {
//     const res = await axios.post(
//       "http://127.0.0.1:5000",
//       formData
//     );
//     console.log(res);
//   } catch (ex) {
//     console.log(ex);
//   }
// };
// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },
//   input: {
//     display: 'none',
//   },
// }));

// export default function UploadButtons() {
//   const classes = useStyles();
//   const [files,setFile]=useState([]);
//   const handlerFile=(e)=>{    
//     console.log(e.target.files);
    
//     let allfiles=[]
//    for(let i=0;i<e.target.files.length;i++){
//     allfiles.push(e.target.files[i]);
//    }
//     if(allfiles.length>0){
//       setFile(allfiles);  
//     }
//   };
  return (
    <>
    <ResponsiveContainer width="100%" minWidth={500} height={750}>
              <iframe src="http://127.0.0.1:5005/" />
            </ResponsiveContainer>
          </>
  );
  }