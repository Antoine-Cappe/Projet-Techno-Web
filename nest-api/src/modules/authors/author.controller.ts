import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors() {
    return this.authorService.getAllAuthors();
  }

  // Correction Bug 4 : Nouvelle route pour les détails
  @Get(':id')
  getAuthorById(@Param('id') id: string) {
    return this.authorService.getAuthorById(id);
  }

  @Post()
  public async createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Patch(':id')
  public async updateAuthor(
    @Param('id') id: string, 
    @Body() updateAuthorDto: UpdateAuthorDto
  ) {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }

  // AJOUT : La route que le Frontend appelle quand on clique sur la poubelle
  @Delete(':id')
  public async deleteAuthor(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }
}
