# backend/task/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import Task
import json
import traceback

# Login View
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            
            user = authenticate(username=username, password=password)
            
            if user:
                return JsonResponse({
                    'success': True,
                    'token': 'dummy-token-' + str(user.id),
                    'user': {
                        'id': user.id,
                        'username': user.username,
                        'email': user.email
                    }
                })
            else:
                return JsonResponse({
                    'success': False,
                    'error': 'Invalid credentials'
                }, status=401)
        except Exception as e:
            print("Login error:", str(e))
            print(traceback.format_exc())
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# Task List View
@csrf_exempt
def task_list(request):
    try:
        if request.method == 'GET':
            # Get all tasks
            try:
                tasks = Task.objects.all()
                tasks_data = []
                for task in tasks:
                    tasks_data.append({
                        'id': task.id,
                        'title': task.title,
                        'description': task.description,
                        'completed': task.completed,  # Changed from 'status' to 'completed'
                        'created_at': task.created_at.isoformat() if task.created_at else None,
                        'user_id': task.user.id if task.user else None
                    })
                print(f"Found {len(tasks_data)} tasks")
                return JsonResponse(tasks_data, safe=False)
            except Exception as db_error:
                print("Database error in GET:", str(db_error))
                print(traceback.format_exc())
                return JsonResponse({'error': 'Database error: ' + str(db_error)}, status=500)
        
        elif request.method == 'POST':
            try:
                data = json.loads(request.body)
                print("Received task data:", data)
                
                # Get the first user (you'll need to implement proper user authentication)
                user = User.objects.first()
                if not user:
                    return JsonResponse({'error': 'No user found'}, status=400)
                
                task = Task.objects.create(
                    user=user,  # Assign to user
                    title=data.get('title'),
                    description=data.get('description', ''),
                    completed=False  # New tasks start as not completed
                )
                print(f"Created task with id: {task.id}")
                
                return JsonResponse({
                    'id': task.id,
                    'title': task.title,
                    'description': task.description,
                    'completed': task.completed,
                    'created_at': task.created_at.isoformat() if task.created_at else None,
                }, status=201)
            except Exception as post_error:
                print("Error creating task:", str(post_error))
                print(traceback.format_exc())
                return JsonResponse({'error': 'Failed to create task: ' + str(post_error)}, status=500)
        
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    except Exception as e:
        print("Unexpected error in task_list:", str(e))
        print(traceback.format_exc())
        return JsonResponse({'error': 'Server error: ' + str(e)}, status=500)

# Task Detail View
@csrf_exempt
def task_detail(request, pk):
    try:
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return JsonResponse({'error': 'Task not found'}, status=404)
        except Exception as db_error:
            print(f"Error finding task {pk}:", str(db_error))
            return JsonResponse({'error': 'Database error'}, status=500)
        
        if request.method == 'GET':
            return JsonResponse({
                'id': task.id,
                'title': task.title,
                'description': task.description,
                'completed': task.completed,
                'created_at': task.created_at.isoformat() if task.created_at else None,
                'user_id': task.user.id if task.user else None
            })
        
        elif request.method == 'DELETE':
            try:
                task.delete()
                return JsonResponse({'message': 'Task deleted successfully'}, status=200)
            except Exception as del_error:
                print(f"Error deleting task {pk}:", str(del_error))
                return JsonResponse({'error': 'Failed to delete task'}, status=500)
        
        elif request.method == 'PUT':
            try:
                data = json.loads(request.body)
                task.title = data.get('title', task.title)
                task.description = data.get('description', task.description)
                task.completed = data.get('completed', task.completed)
                task.save()
                return JsonResponse({
                    'id': task.id,
                    'title': task.title,
                    'description': task.description,
                    'completed': task.completed,
                    'created_at': task.created_at.isoformat() if task.created_at else None,
                })
            except Exception as put_error:
                print(f"Error updating task {pk}:", str(put_error))
                return JsonResponse({'error': 'Failed to update task'}, status=500)
        
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    except Exception as e:
        print("Unexpected error in task_detail:", str(e))
        print(traceback.format_exc())
        return JsonResponse({'error': 'Server error'}, status=500)