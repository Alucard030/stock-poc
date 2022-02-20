import { useEffect, useState } from "react";
import Stock from './Stock'

export default function Stocks(){
    const [formData, setFormData] = useState({
        stockName:"",
        open:"",
        close:""
    });
    const [stocks, setStocks]=useState([]);

    useEffect(()=>{
        getStocks()
    },[])
    const getStocks= async ()=>{
        const response= await fetch(`http://localhost:3000/`);
        const result= await response.json();
        setStocks(result.data);
    }

    const childCallback=()=>{
        getStocks();
    }

    const handleName=(val)=>{
        setFormData(Object.assign({},formData,{stockName:val}));
    }

    const handleOpen=(val)=>{
        setFormData(Object.assign({},formData,{open:val}))
    }

    const handleClose=(val)=>{
        setFormData(Object.assign({},formData,{close:val}))
    }

    const submitForm= async()=>{
        const response=await fetch(`http://localhost:3000/`,{
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(formData)
            })           
            const result= await response.json();
            alert('Stock successfully Added')
            getStocks();
    }

    return(
        <div className="stocks">
            <div>
                <h1>STOCK POC</h1>
                <br/>
            </div>
            <div className="form">
                <h2>ADD FORM</h2>
                <input type="text" placeholder="Stock Name..." value={formData.stockName} onChange={(e)=>{handleName(e.target.value)}}/>
                <br/>
                <input type="text" placeholder="Open..." value={formData.open} onChange={(e)=>{handleOpen(e.target.value)}}/>
                <br/>
                <input type="text" placeholder="Close..." value={formData.close} onChange={(e)=>{handleClose(e.target.value)}}/>
                <br/>
                <button onClick={submitForm}>Add stock</button>
                <br/>
                <br/>
            </div>
            {stocks.length>0 && 
            <>
            <h2>STOCK LIST</h2>
            {stocks.map((el)=>{
                return (<Stock key={el._id} callback={childCallback} id={el._id} name={el.stockName} open={el.open} close={el.close}/>);
            })}</>
            }
        </div>
    );
}