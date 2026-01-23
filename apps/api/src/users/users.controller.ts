import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/updateUserDto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CurrentUser,
  type RequestWithUser,
} from '../common/decorators/current-user.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminOrDonationGuard } from 'src/common/guards/adminOrDonation.guard';
import { ResourceOwner } from 'src/common/decorators/resouce-owner.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //apenas admin pode listar todos os usuarios
  @UseGuards(AdminGuard)
  @Get('/')
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  //apenas o usuario logado pode visualizar seus dados

  @Get('/me')
  async findMe(@CurrentUser() user: RequestWithUser) {
    // buscar id do usuario logado salvo em uma variavel de sessão
    return await this.usersService.getById(user.id);
  }

  //apenas o admin pode visualizar os dados de um usuario pelo id
  @UseGuards(AdminGuard)
  @Get('/:id')
  async findId(@Param('id') id: string) {
    try {
      const user = await this.usersService.getById(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  //apenas o usuario logado pode atualizar seus dados
  @Patch('/me')
  async updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() user: RequestWithUser,
  ) {
    // buscar id do usuario logado salvo em uma variavel de sessão
    try {
      const userUpdated = await this.usersService.update(
        user.id,
        updateUserDto,
      );
      return userUpdated;
    } catch (error) {
      throw error;
    }
  }
  //apenas o admin pode atualizar os dados de um usuario pelo id
  @UseGuards(AdminOrDonationGuard)
  @ResourceOwner('id')
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  //apenas o usuario logado pode remover seus dados
  @Delete('/me')
  async removeMe(@CurrentUser() user: RequestWithUser) {
    try {
      const userRemoved = await this.usersService.remove(user.id);
      return userRemoved;
    } catch (error) {
      throw error;
    }
  }
  //apenas o admin pode remover um usuario pelo id
  @UseGuards(AdminGuard)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.remove(id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
