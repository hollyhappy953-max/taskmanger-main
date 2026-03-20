


// frontend/src/components/TaskForm.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Heading,
  FormControl,
  FormLabel,
  VStack
} from '@chakra-ui/react';

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setIsSubmitting(true);

    const taskData = {
      title: title,
    };

    try {
      const result = await onTaskAdded(taskData);

      if (result) {
        setTitle('');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      maxW="500px"
      mx="auto"
      mt={6}
    >
      <Heading size="md" mb={4}>
        Create New Task
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>

          <FormControl isRequired>
            <FormLabel>Task Title</FormLabel>
            <Input
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            width="full"
            type="submit"
            isLoading={isSubmitting}
            loadingText="Adding"
          >
            Add Task
          </Button>

        </VStack>
      </form>
    </Box>
  );
}

export default TaskForm;