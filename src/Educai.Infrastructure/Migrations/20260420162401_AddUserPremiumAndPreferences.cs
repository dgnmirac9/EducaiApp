using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Educai.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddUserPremiumAndPreferences : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalXp",
                table: "Users",
                newName: "TotalXP");

            migrationBuilder.AddColumn<bool>(
                name: "IsPremium",
                table: "Users",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<List<string>>(
                name: "FocusAreas",
                table: "UserPreferences",
                type: "text[]",
                nullable: false);

            migrationBuilder.AddColumn<int>(
                name: "WeeklyQuestionTarget",
                table: "UserPreferences",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPremium",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "FocusAreas",
                table: "UserPreferences");

            migrationBuilder.DropColumn(
                name: "WeeklyQuestionTarget",
                table: "UserPreferences");

            migrationBuilder.RenameColumn(
                name: "TotalXP",
                table: "Users",
                newName: "TotalXp");
        }
    }
}
