import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dtos/createTaskDto';
import { UpdateTaskDto } from './dtos/updateTaskDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(userID: string, createBody: CreateTaskDto) {
    try {
      const task = await this.prisma.task.create({
        data: {
          ...createBody,
          userId: userID,
        },
      });
      return {
        message: 'Task created successfully',
        data: task,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new BadRequestException('Invalid user reference');
      }

      throw new InternalServerErrorException('Error creating task');
    }
  }

  async findAll(userID: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        userId: userID,
      },
    });
    if (!tasks) {
      console.log(tasks);
      throw new NotFoundException('Tasks not found');
    }
    return tasks;
  }

  async findById(id: string) {
    try {
      const task = await this.prisma.task.findUnique({
        where: { id: id },
      });
      if (!task) {
        throw new NotFoundException('Task not found');
      }
      return task;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Task not found');
      }
      throw new InternalServerErrorException('Error finding task');
    }
  }

  async updateTask(id: string, updateBody: UpdateTaskDto) {
    try {
      const task = await this.prisma.task.update({
        where: { id: id },
        data: updateBody,
      });
      return {
        message: `tarefa atualizada com sucesso!`,
        data: task,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Task not found');
      }
      throw new InternalServerErrorException('Error updating task');
    }
  }

  async deleteTask(id: string) {
    try {
      await this.prisma.task.delete({
        where: { id: id },
      });
      return {
        message: `Task deleted successfully`,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Task not found');
      }
      throw new InternalServerErrorException('Error deleting task');
    }
  }
}
