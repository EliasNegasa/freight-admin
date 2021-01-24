import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import Separator from "../../../utils/separator";

const LowbedInfoPanel = ({ lowbed, setSelectedLowbed }) => {

    console.log("ADDRESS", lowbed);
    const { firstName, lastName, phone, email, address } = lowbed

    const lastUpdate = new Date(lowbed[4] * 1000);

    return (
        <div className="info-panel">
            <CloseIcon className="close-btn" onClick={() => setSelectedLowbed(null)} fontSize="large" />

            {firstName && (
                <>
                    <h2 className="owner-name">{firstName} {lastName}</h2>
                    <Separator />
                </>
            )}
            <table>
                <tbody>
                    {phone && (
                        <tr>
                            <th>Phone:</th>
                            <td>{phone}</td>
                        </tr>
                    )}
                    {email && (
                        <tr>
                            <th>Email:</th>
                            <td>{email}</td>
                        </tr>
                    )}
                    {address.long && (
                        <tr>
                            <th>Longitude:</th>
                            <td>{address.long}</td>
                        </tr>
                    )}
                    {address.lat && (
                        <tr>
                            <th>Latitude:</th>
                            <td>{address.lat}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {lastUpdate && (
                <p className="last-update">
                    Last update: {lastUpdate.toLocaleTimeString()}
                </p>
            )}
        </div>
    );
};

export default LowbedInfoPanel;
