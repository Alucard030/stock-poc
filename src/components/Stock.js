import { useEffect, useState } from "react";
export default function Stock(props){
    const [stockForm,setStockForm]= useState({
        stockName:props.name,
        open:props.open,
        close:props.close,
        _id:props.id
    })
    const [isDisabled,setIsDisabled]=useState(true);

    const handleName=(val)=>{
        setStockForm(Object.assign({},stockForm,{stockName:val}));
    }

    const handleOpen=(val)=>{
        setStockForm(Object.assign({},stockForm,{open:val}))
    }

    const handleClose=(val)=>{
        setStockForm(Object.assign({},stockForm,{close:val}))
    }

    const handleEdit=async()=>{
        setIsDisabled(!isDisabled);
        if(!isDisabled){
           const response=await fetch(`http://localhost:3000/`,{
                method:'PUT',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(stockForm)
            })           
            const result= await response.json();
            alert('Stock successfully Edited')
            props.callback();
        }
    }

    const handleDelete=async ()=>{
        const response=await fetch(`http://localhost:3000/`,{
                method:'DELETE',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({_id:stockForm._id})
            })           
            const result= await response.json();
            alert('Stock successfully Deleted')
            props.callback();
    }

    return (
        <div className="stock">
            <input type="text" disabled={isDisabled} value={stockForm.stockName} onChange={(e)=>{handleName(e.target.value)}}/>
            <input type="text" disabled={isDisabled} value={stockForm.open} onChange={(e)=>{handleOpen(e.target.value)}}/>
            <input type="text" disabled={isDisabled} value={stockForm.close} onChange={(e)=>{handleClose(e.target.value)}}/>
            <button onClick={handleEdit}>{isDisabled?'Edit':'Submit'}</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}