import React, { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import Form from "react-bootstrap/Form";
import AddEditAppointment from "./Components/Calendar/AddEditAppointment";

export default function App() {
	const [isAddEditAppointmentVisible, setIsAddEditAppointmentVisible] =
		useState(false);

	const [appointmentsList, setAppointmentsList] = useState([]);

	const [appointmentDetails, setAppointmentDetails] = useState({
		firstName: "",
		lastName: "",
		phoneNumber: "",
	});

	const testing = {
		selectable: true,
		headerToolbar: {
			left: "prev,next today",
			center: "title",
			right: "dayGridMonth,timeGridWeek,timeGridDay",
		},
		dateClick: function (info) {
			setIsAddEditAppointmentVisible(true);
			setAppointmentDetails((prevState) => {
				return { ...prevState, start: info.date, end: info.date };
			});
		},
		events: [...appointmentsList],
	};

	return (
		<>
			<div style={{ width: "100%", heigth: "100%" }}>
				<FullCalendar
					selectable
					{...testing}
					plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
					initialView="dayGridMonth"
				/>
			</div>
			{isAddEditAppointmentVisible ? (
				<AddEditAppointment
					title="Enter Details"
					onClose={() => {
						setIsAddEditAppointmentVisible(false);
						setAppointmentDetails({});
					}}
					isVisible={isAddEditAppointmentVisible}
					onConfirm={() => {
						setAppointmentsList((prevState) => {
							return [
								...prevState,
								{
									...appointmentDetails,
								},
							];
						});
						setIsAddEditAppointmentVisible(false);
					}}
				>
					<Form>
						<div style={{ display: "flex", gap: "10px", flexDirection: "row" }}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									value={appointmentDetails.firstName}
									name="firstName"
									onChange={(event) => {
										setAppointmentDetails((prevState) => {
											return {
												...prevState,
												[event.target.name]: event.target.value,
											};
										});
									}}
									type="text"
									placeholder="First Name"
								/>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Last Name</Form.Label>
								<Form.Control
									value={appointmentDetails.lastName}
									name="lastName"
									onChange={(event) => {
										setAppointmentDetails((prevState) => {
											return {
												...prevState,
												[event.target.name]: event.target.value,
											};
										});
									}}
									type="text"
									placeholder="Last Name"
								/>
							</Form.Group>
						</div>
						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								value={appointmentDetails.phoneNumber}
								name="phoneNumber"
								onChange={(event) => {
									setAppointmentDetails((prevState) => {
										return {
											...prevState,
											[event.target.name]: event.target.value,
										};
									});
								}}
								type="number"
								placeholder="Phone Number"
							/>
						</Form.Group>
						<Form.Group className="mb-3" controlId="formBasicCheckbox">
							<Form.Check type="checkbox" label="Check me out" />
						</Form.Group>
					</Form>
				</AddEditAppointment>
			) : null}
		</>
	);
}

// export default class DemoApp extends React.Component {

//   render() {
//     return (
//       <FullCalendar
//         plugins={[ dayGridPlugin, interactionPlugin ]}
//         dateClick={this.handleDateClick}
//       />
//     )
//   }

//   handleDateClick = (arg) => { // bind with an arrow function
//     alert(arg.dateStr)
//   }

// }
