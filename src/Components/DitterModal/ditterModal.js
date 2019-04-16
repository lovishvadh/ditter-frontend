import React, { Component } from 'react';
import {
    Modal,
    Form,
    Button
} from 'react-bootstrap';
import ditterService from '../../services/ditterService';
import { toast } from 'react-toastify';

class DitterModal extends Component {
    state = { 
        ditterText: ''
     }
    render() { 
        return ( 
            <div>
                <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Ditter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group controlId="textarea">
                <Form.Control name="ditterText" onChange={(event) => this.handleUserInput(event)} as="textarea" placeholder="Write here..." rows="3" value={this.state.ditterText} />
              </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.postDitter}>
                        Post
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
         );
    }

    handleUserInput (e) {
        const name = e.target.name;
        const value = e.target.value;
          this.setState({[name]: value});
      }

    postDitter = async () => {
        let response = await ditterService.postNewDitter({ditterText: this.state.ditterText});
        if(response.status) {
            toast.success('Posted successfully!');
        } else {
            toast.error('Some error occurred!');
        }
        this.setState({ditterText: ''})
        this.props.handleClose();
    }
}
 
export default DitterModal;