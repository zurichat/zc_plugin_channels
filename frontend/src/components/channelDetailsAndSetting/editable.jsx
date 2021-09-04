import React, { useState, useEffect } from "react";
import { Flex, Text, Stack } from "@chakra-ui/layout";
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

	const keyDownHandler = (event, type) => {
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

	const clickHandler = () => setEditing(true);
	return (
		<Stack {...props}>
			{isEditing ? (
				<Flex
					onBlur={() => setEditing(false)}
					onKeyDown={(event) => keyDownHandler(event, type)}
				>
					{children}
				</Flex>
			) : (
				<Text onClick={clickHandler}>{text || placeholder || "Add text"}</Text>
			)}
		</Stack>
	);
};

export default Editable;
