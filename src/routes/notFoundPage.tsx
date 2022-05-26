import React from 'react';
import {Link} from "react-router-dom";

const NotFoundPage = ()=>(
    <div>
          <h1>Create new Item</h1>
                <Form className="create-page-form" onSubmit={uploadHandler}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Image, Video, Audio, or 3D Model<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="file" placeholder="File" onChange={fileHandler} />
                    </Form.Group>
                    <Form.Text className="text-muted">
                        <span style={{ color: 'red' }} >*</span>Required fields
                    </Form.Text>
                    <Form.Group className="mb-3" >
                        <Form.Label>Name<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="item" placeholder="Item name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Description</Form.Label>
                        <Form.Control style={{ padding: '10px 10px 50px 10px' }} type="text" name="description" placeholder="Provide a detailed description of your item" />
                        <Form.Text className="text-muted">
                            The description will be included on the item's detail page underneath its image.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Royalty Fee %<span style={{ color: 'red' }} >*</span></Form.Label>
                        <Form.Control type="text" name="Royalty" placeholder="Royalty Fee %" required />
                    </Form.Group>
                    <br/>
                    <label>
                        Choose currency to create nft:
                        <select value={currencyValue} onChange={(e)=>setcurrencyValue(e.target.value)}>         
                            <option value="lime">Ether</option>
                            <option value="coconut">other</option>
                           
                        </select>
                        </label>
                        <br/>
                    <hr />
                    <Button variant="primary" type="submit" onClick={handleShow}>
                        Create
                    </Button>
                </Form>
    </div>
);

export default NotFoundPage;