-- CreateTable
CREATE TABLE `m_vendor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_vendor` VARCHAR(191) NOT NULL,
    `tanggal_gabung` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vendor_id` INTEGER NOT NULL,
    `nama_product` VARCHAR(191) NOT NULL,
    `tanggal_masuk` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `modal` DECIMAL(10, 0) NOT NULL,
    `qty` INTEGER NOT NULL,
    `harga_jual` DECIMAL(10, 0) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `m_product_vendor_id_key`(`vendor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `m_report` (
    `id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `profit` DECIMAL(10, 0) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `m_report_product_id_key`(`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `m_product` ADD CONSTRAINT `m_product_vendor_id_fkey` FOREIGN KEY (`vendor_id`) REFERENCES `m_vendor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `m_report` ADD CONSTRAINT `m_report_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `m_product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
