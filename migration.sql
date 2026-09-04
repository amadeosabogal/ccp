-- Creación de la tabla LeyendasMapa
CREATE TABLE LeyendasMapa (
    id VARCHAR(50) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    color VARCHAR(20) NOT NULL,
    createdAt DATETIME DEFAULT GETDATE()
);
GO

-- Agregar la columna leyendaId a la tabla SalasOracion (si no existe)
IF NOT EXISTS (
    SELECT * FROM sys.columns 
    WHERE Name = N'leyendaId' 
    AND Object_ID = Object_ID(N'SalasOracion')
)
BEGIN
    ALTER TABLE SalasOracion ADD leyendaId VARCHAR(50) NULL;
END
GO
