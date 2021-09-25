import React, { Fragment } from 'react'
import { Container, Box } from "@chakra-ui/react"



function Display({ emojis, handleIncrement }) {
    return (
        <div>
            <Box cursor="pointer" alignItems="center" display="flex">
                {emojis && emojis.length > 0 && emojis.map((item, index) => (
                    <Fragment key={index} >
                        <Container
                            onClick={() => handleIncrement(item.emoji)}

                        >
                            {item.emoji}
                        </Container>
                        {item.count > 0 && (
                            <h4>{item.count}</h4>
                        )}

                    </Fragment>
                ))}
            </Box>
        </div>
    )
}

export default Display
