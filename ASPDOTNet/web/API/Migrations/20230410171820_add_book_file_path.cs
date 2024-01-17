using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class add_book_file_path : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
