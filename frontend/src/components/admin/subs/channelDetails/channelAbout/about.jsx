/** @format */

import React, { useState, useRef } from "react";
import { Flex, Heading, Box, Text } from "@chakra-ui/layout";
import { Input, Textarea } from "@chakra-ui/react";
import Editable from "./editable";

function About() {
	const name = "Fikun";
	const channelCreationDate = "August 28, 2021";
	const [topic, setTopic] = useState("");
	const [description, setDescription] = useState("");
	const inputRef = useRef();

	const topicHandler = (event) => setTopic(event.target.value);
	const descriptionHandler = (event) => setDescription(event.target.value);
	return (
		<Flex
			direction='column'
			alignSelf='center'
			justify='center'
			m='1.2rem 3.1rem'
			bg='white.700'
			borderRadius='3px'
			border='1px'
			borderColor='gray.200'
			boxSizing='border-box'
			fontSize={12}
			lineHeight='130%'
		>
			<Box
				p='0.4rem 1rem 0.6rem'
				direction='column'
				borderBottom='1px'
				borderBottomColor='gray.200'
				className='feature-info'
			>
				<Heading
					mb='.32rem'
					fontWeight='bold'
					fontSize={12}
					lineHeight='130%'
					color='black.300'
				>
					Topic
				</Heading>
				<Editable
					text={topic}
					childRef={inputRef}
					placeholder='Add a topic'
					type='input'
				>
					<Input
						type='text'
						name='topic'
						ref={inputRef}
						variant='unstyled'
						size='xs'
						placeholder='Add a topic'
						className='editable'
						value={topic}
						onChange={topicHandler}
					/>
				</Editable>
			</Box>

			<Box
				className='feature-info'
				p='0.4rem 1rem 0.6rem'
				direction='column'
				borderBottom='1px'
				borderBottomColor='gray.200'
				color='black.800'
			>
				<Heading
					mb='.32rem'
					fontWeight='bold'
					fontSize={12}
					lineHeight='130%'
					color='black.300'
				>
					Description
				</Heading>
				<Editable
					text={description}
					placeholder='Add channel description'
					type='textarea'
					childRef={inputRef}
				>
					<Textarea
						name='description'
						ref={inputRef}
						placeholder='Add channel description'
						className='editable'
						resize='none'
						size='xs'
						focusBorderColor='green.200'
						value={description}
						onChange={descriptionHandler}
					/>
				</Editable>
			</Box>

			<Box
				p='0.4rem 1rem 0.6rem'
				direction='column'
				borderBottom='1px'
				borderBottomColor='gray.200'
				className='feature-info'
			>
				<Heading
					mb='.32rem'
					fontWeight='bold'
					fontSize={12}
					lineHeight='130%'
					color='black.300'
				>
					Created by
				</Heading>
				<Text>
					{name} on {channelCreationDate}
				</Text>
			</Box>
			<Box className='feature-info' p='0.4rem 1rem 0.6rem'>
				<Text as='a' href='#' color='#f44336' fontWeight='600' pt='0.6rem'>
					Leave Channel
				</Text>
			</Box>
		</Flex>
	);
}

export default About;
