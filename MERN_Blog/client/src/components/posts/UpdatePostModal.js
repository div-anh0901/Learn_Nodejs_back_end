import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
import { useContext, useState } from "react";

const UpdatePostModal = () => {
  //Contexts
  const { 
          postState:{ post},
          showUpdatePostModal, 
          setShowUpdatePostModal, 
          updatePost, 
          setShowToast 
} = useContext(PostContext);

  // State
  const [ updatedPost, setUpdatedPost] = useState(post);

  const { title, description, url ,status} = updatedPost;
  const onChangeUpdatePostForm = (event) =>
  setUpdatedPost({
      ...updatedPost,
      [event.target.name]: event.target.value,
    });
   const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
   };

  const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await updatePost(updatedPost)
		setShowUpdatePostModal(false);
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}
//   const resetAddPostData = () => {
//     setUpdatedPost({ title: '', description: '', url: '', status: 'TO LEARN' });
//     setShowUpdatePostModal(false);
//   };

  return (
    <Modal show={showUpdatePostModal} animation={false} >
      <Modal.Header closeButton>
        <Modal.Title>Making progress</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatePostForm}
            />
            <Form.Text id="title-help" muted>
              Reauired
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Description"
              name="description"
              rows={3}
              value={description}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtobe Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <Form.Group>
                <Form.Control 
                    as="select" 
                    value={status} 
                    name="status" 
                    onChange={onChangeUpdatePostForm}
                >
                    <option value="TO LEARN">
                        TO LEARN
                    </option>
                    <option value="LEARNING">
                        LEARNING
                    </option>
                    <option value="LEARNED">
                        LEARNED
                    </option>
                </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">LearnIt</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
