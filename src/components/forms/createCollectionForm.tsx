

import React from "react";
import '../../CSS/Form.css'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css"

const schema = yup.object().shape({
    File: yup.mixed()
    .test('required', "You need to provide a file", (value) =>{
      return value && value.length
    } ),
    ContractName: yup.string().required(),
    ContractSymbol: yup.string().required(),
    CollectionName: yup.string().required(),
    Discription: yup.string().required(),
    RoyalityFee: yup.number().positive().typeError('you must specify a number'),
    select: yup.string().required()
 
});

type Props = {
  uploadHandler: Function;
  fileHandler : Function;
  

};

function CollectionFormComponent({uploadHandler,fileHandler}:Props) {
  const { register, handleSubmit,setValue, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (data:any) => {
    console.log(data);
    uploadHandler(data);
  };

  const change =(e:any)=>{
    fileHandler(e.target.files[0]);
  }
  return (
    <div className="Form">
      <div className="title">Create new Collection</div>
      <div className="inputs">
        <form  className="create-page-form"  onSubmit={handleSubmit(submitForm)}>
        <label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></label>
        <br/>
          <input className="form-control"
            type="file"
           
            {...register("File")}

            onChange={change}
           
          />
          <p> {errors.File?.message} </p>

          <label> ContractName<span style={{ color: 'red' }} >*</span></label>
          <input  className="form-control"
            type="text"
           
            {...register("ContractName")}
            placeholder="ContractName..."
           
          />
          <p> {errors.ContractName?.message} </p>

          <label>ContractSymbol<span style={{ color: 'red' }} >*</span></label>
          <input  className="form-control"
            type="text"
           
            {...register("ContractSymbol")}
            placeholder="ContractSymbol..."
           
          />
          <p> {errors.ContractSymbol?.message} </p>

         <label>CollectionName<span style={{ color: 'red' }} >*</span></label>
          <input  className="form-control"
            type="text"
           
            {...register("CollectionName")}
            placeholder="CollectionName..."
           
          />
          <p> {errors.CollectionName?.message} </p>


          <label>Choose category for Collection<span style={{ color: 'red' }} >*</span></label>
          <select className="form-control"
          {...register("select")}
          onChange={(e) => setValue('select', e.target.value, { shouldValidate: true })} // Using setValue
        >
           <option value="">Select...</option>
           <option value="Art">Art</option>
            <option value="Sports">Sports</option>
            <option value="Gaming">Gaming</option>
            <option value="Photography">Photography</option>
            <option value="Entertainment">Entertainment</option>
        </select>
        {<p>{errors.select?.message}</p>}

          <label>CollectionDiscription<span style={{ color: 'red' }} >*</span></label>
          <textarea className="mb-3"
            
           
            {...register("Discription")}
            placeholder="Discription..."

         
          />
          <p> {errors.Discription?.message} </p>


          <label>Royality<span style={{ color: 'red' }} >*</span></label>

          <input className="form-control" type="number"   {...register("RoyalityFee")} placeholder="RoyalityFee.."  />

          <p> {errors.RoyalityFee?.message} </p>
          

       

        

       
          
          <Button type="submit" id="submit">create</Button> 
        </form>
      </div>
    </div>
  );




  
}

export default CollectionFormComponent;
