import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError, successResponse } from '@/lib/api-utils';
import { packageUpdateSchema } from '@/lib/validations';

// GET /api/packages/[id] - Get a single package
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const packageData = await prisma.package.findUnique({
      where: { id: params.id },
      include: {
        reviews: {
          where: { verified: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!packageData) {
      return handleApiError(new Error('Package not found'));
    }

    return successResponse(packageData);
  } catch (error) {
    return handleApiError(error);
  }
}

// PUT /api/packages/[id] - Update a package (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add admin authentication middleware
    const body = await request.json();
    const validatedData = packageUpdateSchema.parse(body);

    const updatedPackage = await prisma.package.update({
      where: { id: params.id },
      data: validatedData,
    });

    return successResponse(updatedPackage);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/packages/[id] - Delete a package (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // TODO: Add admin authentication middleware
    // Soft delete by setting isActive to false
    const deletedPackage = await prisma.package.update({
      where: { id: params.id },
      data: { isActive: false },
    });

    return successResponse(deletedPackage);
  } catch (error) {
    return handleApiError(error);
  }
}
