import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    HStack,
    Switch,
    Button,
    ModalFooter,
    Text,
    Flex,

} from "@chakra-ui/react";
const AdditionalSettingModal = ({isOpen, onClose}) => {
    return(
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="20px">Additional Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text fontFamily="Lato" color="gray.400" fontSize="16px" mb="10px">
                            Adjust your notifications, alerts, and message alert settings here.
                        </Text>
                        <Text fontFamily="Lato" fontSize="16px" color="gray.700" fontWeight="bold" mb="3px">
                            Archive this channel
                        </Text>
                        <HStack justifyContent="space-between" fontFamily="Lato" mb="10px">
                            <Text fontSize="16px" color="gray.400">
                                If you don’t think it will be used anymore you can archive it (All members will be removed ). You can retireive it later.
                            </Text>
                            <Switch id="archiveChannel" color="#00B87C" />
                        </HStack>
                        
                            <Text fontFamily="Lato" fontSize="16px" color="#2B2B2B" fontWeight="bold" pb="10px">Rename this channel</Text>
                            <Text fontSize="16px" color="gray.400" pb="10px">you can rename your channel name anytime, but dont do it too often</Text>
                       
                        <Flex justifyContent="space-between" mb="30px">
                            <Text fontWeight="700" fontSize="16px" color="#2B2B2B">Set this channel to private</Text>
                            <Switch id="setChannel" color="#00B87C" />
                        </Flex>
                        
                            <Text fontSize="16px" fontWeight="bold" color="#2B2B2B">Delete this channel</Text>
                            <HStack>
                            <Flex justifyContent="space-between">
                                <Text fontSize="16px" width="319px" color="#8B8B8B"fontWeight="normal" fontFamily="Lato">
                                    Deleting a channel will permanently remove all of its messages. This cannot be undone.
                                </Text>
                                <Button bg="#00B87C" fontSize="15px" width="140px" borderRadius="3px" width="" border="none" color="#FFFFFF" outline="none">
                                    Delete Channel
                                </Button>
                            </Flex>
                        </HStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={onClose} borderRadius="3px" bg="#00B87C" color="#ffffff">
                                Done
                            </Button>
                        </ModalFooter>
                </ModalContent>
        </Modal>
    );
};
export default AdditionalSettingModal;