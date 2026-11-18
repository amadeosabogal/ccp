-- Puntos de referencia de los hermanos (un registro por persona).
-- Es informacion personal: solo se expone por /api/hermanos con sesion iniciada.
IF OBJECT_ID(N'HermanosMapa', N'U') IS NULL
BEGIN
    CREATE TABLE HermanosMapa (
        id INT IDENTITY(1,1) PRIMARY KEY,
        nombre NVARCHAR(150) NOT NULL,
        categoria VARCHAR(20) NOT NULL,            -- 'casado' | 'joven' | 'nino'
        bautizado BIT NOT NULL DEFAULT 0,
        testimoniado BIT NOT NULL DEFAULT 0,
        familia INT NULL,                          -- agrupa a los miembros de un mismo hogar
        orden INT NULL,                            -- posicion de la persona dentro de su familia
        direccion NVARCHAR(300) NULL,
        lat DECIMAL(10, 7) NOT NULL,
        lng DECIMAL(10, 7) NOT NULL,
        ubicacionAproximada BIT NOT NULL DEFAULT 0, -- 1 = obtenida por geocodificacion de la direccion escrita
        createdAt DATETIME NOT NULL DEFAULT GETDATE()
    );
END
GO
