namespace Dashboard.Infra.Data.Context
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class sd1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Commercial",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PairId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        OI = c.Int(nullable: false),
                        Long = c.Int(nullable: false),
                        Short = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.NonCommercial",
                c => new
                    {
                        Id = c.Guid(nullable: false, identity: true),
                        PairId = c.Int(nullable: false),
                        Date = c.DateTime(nullable: false),
                        OI = c.Int(nullable: false),
                        Long = c.Int(nullable: false),
                        Short = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pair",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PairName = c.String(maxLength: 100, unicode: false),
                        FullName = c.String(maxLength: 100, unicode: false),
                        Description = c.String(maxLength: 100, unicode: false),
                        CreateDate = c.DateTime(nullable: false),
                        UpdateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Pair");
            DropTable("dbo.NonCommercial");
            DropTable("dbo.Commercial");
        }
    }
}
