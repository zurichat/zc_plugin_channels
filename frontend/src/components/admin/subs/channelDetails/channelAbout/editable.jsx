/** @format */

import React, { useState, useEffect } from "react";
// Inline Editable Component

const Editable = ({
	childRef,
	text,
	type,
	placeholder,
	children,
	...props
}) => {
	const [isEditing, setEditing] = useState(false);

	useEffect(() => {
		if (childRef && childRef.current && isEditing === true) {
			childRef.current.focus();
		}
	}, [isEditing, childRef]);

	const handleKeyDown = (event, type) => {
		const { key } = event;
		const keys = ["Escape", "Tab"];
		const enterKey = "Enter";
		const allKeys = [...keys, enterKey];
		if (
			(type === "textarea" && keys.indexOf(key) > -1) ||
			(type !== "textarea" && allKeys.indexOf(key) > -1)
		) {
			setEditing(false);
		}
	};
	return (
		<section {...props}>
			{isEditing ? (
				<div
					onBlur={() => setEditing(false)}
					onKeyDown={(e) => handleKeyDown(e, type)}
				>
					{children}
				</div>
			) : (
				<div onClick={() => setEditing(true)}>
					<span>{text || placeholder || "Edit content"}</span>
				</div>
			)}
		</section>
	);
};

export default Editable;
