namespace Dashboard.Infra.Data.Context
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class asd : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Commercial", "OIChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Commercial", "LongChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Commercial", "ShortChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Commercial", "Net", c => c.Int(nullable: false));
            AddColumn("dbo.Commercial", "NetChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Commercial", "NetChangePercent", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.Commercial", "COT", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.NonCommercial", "OIChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.NonCommercial", "LongChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.NonCommercial", "ShortChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.NonCommercial", "Net", c => c.Int(nullable: false));
            AddColumn("dbo.NonCommercial", "NetChange", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.NonCommercial", "NetChangePercent", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AddColumn("dbo.NonCommercial", "COT", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            DropColumn("dbo.NonCommercial", "COT");
            DropColumn("dbo.NonCommercial", "NetChangePercent");
            DropColumn("dbo.NonCommercial", "NetChange");
            DropColumn("dbo.NonCommercial", "Net");
            DropColumn("dbo.NonCommercial", "ShortChange");
            DropColumn("dbo.NonCommercial", "LongChange");
            DropColumn("dbo.NonCommercial", "OIChange");
            DropColumn("dbo.Commercial", "COT");
            DropColumn("dbo.Commercial", "NetChangePercent");
            DropColumn("dbo.Commercial", "NetChange");
            DropColumn("dbo.Commercial", "Net");
            DropColumn("dbo.Commercial", "ShortChange");
            DropColumn("dbo.Commercial", "LongChange");
            DropColumn("dbo.Commercial", "OIChange");
        }
    }
}
