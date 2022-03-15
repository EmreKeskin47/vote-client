import React, {useState} from "react";
import Cube from "react-3d-cube";

import "./Cube.css";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/ban-ts-comment
//@ts-ignore
export default function CubeItem(props) {
    return (
        <div className="Cube">
            {/* eslint-disable-next-line react/prop-types */}
            <h1 style={{color: "white"}}>{props.topic}</h1>
            <div
                style={{
                    width: 300,
                    height: 300
                }}
            >
                <Cube size={300} index="front">
                    <div
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "pink",
                            textAlign: "center",
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        Topic
                    </div>
                    <div
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "blue",
                            textAlign: "center",
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        ID: {props.id}
                    </div>
                    <div
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "purple",
                            textAlign: "center",
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        Yes: {props.yesCount}
                    </div>
                    <div
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "orange",
                            textAlign: "center",
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        No: {props.noCount}
                    </div>
                    <div
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "red",
                            textAlign: "center",
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        Owner: {props.owner}
                    </div>
                    <div
                        style={{
                            width: "300px",
                            height: "300px",
                            backgroundColor: "yellow",
                            textAlign: "center",
                        }}
                    >
                        {/* eslint-disable-next-line react/prop-types */}
                        Deadline: {props.deadline}
                    </div>
                </Cube>
            </div>
        </div>
    );
}