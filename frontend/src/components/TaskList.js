

// frontend/src/components/TaskList.js
import React from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Badge
} from '@chakra-ui/react';

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {

  if (!tasks || tasks.length === 0) {
    return (
      <Box mt={6} textAlign="center">
        <Heading size="md">Task List</Heading>
        <Text mt={2} color="gray.500">
          Your tasks will appear here
        </Text>
      </Box>
    );
  }

  return (
    <Box mt={8}>
      <Heading size="md" mb={4}>
        Task List ({tasks.length})
      </Heading>

      <VStack spacing={4} align="stretch">
        {tasks.map(task => (
          <Box
            key={task.id}
            p={5}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="sm"
            bg={task.completed ? "gray.100" : "white"}
          >
            <HStack justify="space-between">

              <Box>
              <Text
                fontSize="lg"
                fontWeight="bold"
                textDecoration={task.completed ? "line-through" : "none"}
                color={task.completed ? "gray.500" : "black"}
              >
                {task.title}
              </Text>

                {task.completed && (
                  <Badge colorScheme="green" mt={1}>
                    Completed
                  </Badge>
                )}

                <Text fontSize="sm" color="gray.500" mt={1}>
                  Created: {new Date(task.date).toLocaleDateString()}
                </Text>
              </Box>

              <HStack>

              <Button
                colorScheme="green"
                size="sm"
                onClick={() => onUpdateTask(task.id)}
                isDisabled={task.completed}
              >
                Complete
              </Button>

                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => onDeleteTask(task.id)}
                >
                  Delete
                </Button>

              </HStack>

            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

export default TaskList;