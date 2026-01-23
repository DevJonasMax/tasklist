import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/createTaskDto';
import { UpdateTaskDto } from './dtos/updateTaskDto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { RequestWithUser } from 'src/common/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AdminOrTaskOwnerGuard } from './guard/adminOrTaskOwner.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  createTask(
    @Body() createBody: CreateTaskDto,
    @CurrentUser() user: RequestWithUser,
  ) {
    return this.taskService.createTask(user.id, createBody);
  }

  // admin pode ver todas as tarefas, enquanto usuário comum apenas as próprias

  @Get('/')
  findAllTasks(@CurrentUser() user: RequestWithUser) {
    return this.taskService.findAll(user.id);
  }

  // admin pode ver qualquer tarefa, enquanto usuário comum apenas as próprias
  @UseGuards(AdminOrTaskOwnerGuard)
  @Get('/task/:id')
  findOneTask(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  // admin pode atualizar qualquer tarefa, enquanto usuário comum apenas as próprias
  @UseGuards(AdminOrTaskOwnerGuard)
  @Patch('update/:id')
  updateTask(@Param('id') id: string, @Body() updateBody: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateBody);
  }

  // admin pode deletar qualquer tarefa, enquanto usuário comum apenas as próprias
  @UseGuards(AdminOrTaskOwnerGuard)
  @Delete('delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
