import { Heading, Stack, Card, CardHeader, CardBody, Text} from '@chakra-ui/react'
import React from 'react'


const FutureForecast = () => {
    return (
        <Stack spacing='4' marginX = "10px" marginY = "10px">
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday'].map((variant) => (
            <Card size = "sm" key={variant}>
            <CardHeader>
                <Heading size='sm' textAlign = "left"> {variant}</Heading>
            </CardHeader>
            <CardBody>
                <Text>shlerping zazu</Text>
            </CardBody>
            </Card>
        ))}
        </Stack>
    )
}

export default FutureForecast;