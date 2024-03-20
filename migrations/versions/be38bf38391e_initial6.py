"""Initial6

Revision ID: be38bf38391e
Revises: 41515f4ab72f
Create Date: 2023-12-23 12:30:00.908890

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'be38bf38391e'
down_revision: Union[str, None] = '41515f4ab72f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
