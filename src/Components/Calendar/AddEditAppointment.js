import { bool, func, node, string } from "prop-types";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddEditAppointment = ({
	isVisible,
	onClose,
	onConfirm,
	title,
	children,
	secondaryText,
	primaryText,
	showCloseButton,
}) => {
	return (
		<Modal show={isVisible} onHide={onClose}>
			<Modal.Header closeButton={showCloseButton}>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					{secondaryText}
				</Button>
				<Button variant="primary" onClick={onConfirm}>
					{primaryText}
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

AddEditAppointment.propTypes = {
	isVisible: bool,
	showCloseButton: bool,
	onClose: func,
	onConfirm: func,
	primaryText: string,
	secondaryText: string,
	title: string,
	children: node,
};

AddEditAppointment.defaultProps = {
	isVisible: false,
	showCloseButton: true,
	onClose: () => {},
	primaryText: "Save",
	secondaryText: "Cancel",
	title: "Confirm",
	children: <></>,
};
export default AddEditAppointment;
