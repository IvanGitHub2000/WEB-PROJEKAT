using Microsoft.EntityFrameworkCore.Migrations;

namespace WEB_PROJEKAT.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Organizacija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Osnivac = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    VrednostOrganizacijeUMilionimaDolara = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizacija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Arena",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Drzava = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Kapacitet = table.Column<int>(type: "int", nullable: false),
                    PotrebnaCovidPropusnica = table.Column<bool>(type: "bit", nullable: false),
                    OrganizacijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Arena", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Arena_Organizacija_OrganizacijaID",
                        column: x => x.OrganizacijaID,
                        principalTable: "Organizacija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Borba",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PrviBorac = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DrugiBorac = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Pobednik = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    NovcanaNagradaUHiljadamaDolara = table.Column<int>(type: "int", nullable: false),
                    ArenaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Borba", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Borba_Arena_ArenaID",
                        column: x => x.ArenaID,
                        principalTable: "Arena",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Borac",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Kategorija = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Ranking = table.Column<int>(type: "int", nullable: false),
                    BrojPobeda = table.Column<int>(type: "int", nullable: false),
                    BrojPoraza = table.Column<int>(type: "int", nullable: false),
                    KnockoutRatio = table.Column<int>(type: "int", nullable: false),
                    BorbaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Borac", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Borac_Borba_BorbaID",
                        column: x => x.BorbaID,
                        principalTable: "Borba",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Arena_OrganizacijaID",
                table: "Arena",
                column: "OrganizacijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Borac_BorbaID",
                table: "Borac",
                column: "BorbaID");

            migrationBuilder.CreateIndex(
                name: "IX_Borba_ArenaID",
                table: "Borba",
                column: "ArenaID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Borac");

            migrationBuilder.DropTable(
                name: "Borba");

            migrationBuilder.DropTable(
                name: "Arena");

            migrationBuilder.DropTable(
                name: "Organizacija");
        }
    }
}
