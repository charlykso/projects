using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class change_back_to_adding_books_as_text : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Book_FilePath",
                table: "Books");

            migrationBuilder.AddColumn<string>(
                name: "Body",
                table: "Books",
                type: "nvarchar(MAX)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Body",
                table: "Books");

            migrationBuilder.AddColumn<string>(
                name: "Book_FilePath",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
